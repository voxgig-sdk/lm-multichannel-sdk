<?php
declare(strict_types=1);

// LmMultichannel SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class LmMultichannelSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new LmMultichannelUtility();
        $this->_utility = $utility;

        $config = LmMultichannelConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = LmMultichannelHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = LmMultichannelHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, LmMultichannelFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return LmMultichannelUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = LmMultichannelHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = LmMultichannelHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = LmMultichannelHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new LmMultichannelSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = LmMultichannelHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = LmMultichannelHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_content = null;

    // Canonical facade: $client->Content()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->content()
    // resolves here too.
    public function Content($data = null)
    {
        require_once __DIR__ . '/entity/content_entity.php';
        if ($data === null) {
            if ($this->_content === null) {
                $this->_content = new ContentEntity($this, null);
            }
            return $this->_content;
        }
        return new ContentEntity($this, $data);
    }


    private $_message = null;

    // Canonical facade: $client->Message()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->message()
    // resolves here too.
    public function Message($data = null)
    {
        require_once __DIR__ . '/entity/message_entity.php';
        if ($data === null) {
            if ($this->_message === null) {
                $this->_message = new MessageEntity($this, null);
            }
            return $this->_message;
        }
        return new MessageEntity($this, $data);
    }


    private $_message_event = null;

    // Canonical facade: $client->MessageEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->message_event()
    // resolves here too.
    public function MessageEvent($data = null)
    {
        require_once __DIR__ . '/entity/message_event_entity.php';
        if ($data === null) {
            if ($this->_message_event === null) {
                $this->_message_event = new MessageEventEntity($this, null);
            }
            return $this->_message_event;
        }
        return new MessageEventEntity($this, $data);
    }


    private $_option = null;

    // Canonical facade: $client->Option()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->option()
    // resolves here too.
    public function Option($data = null)
    {
        require_once __DIR__ . '/entity/option_entity.php';
        if ($data === null) {
            if ($this->_option === null) {
                $this->_option = new OptionEntity($this, null);
            }
            return $this->_option;
        }
        return new OptionEntity($this, $data);
    }


    private $_schedule = null;

    // Canonical facade: $client->Schedule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->schedule()
    // resolves here too.
    public function Schedule($data = null)
    {
        require_once __DIR__ . '/entity/schedule_entity.php';
        if ($data === null) {
            if ($this->_schedule === null) {
                $this->_schedule = new ScheduleEntity($this, null);
            }
            return $this->_schedule;
        }
        return new ScheduleEntity($this, $data);
    }


    private $_self = null;

    // Canonical facade: $client->Self()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->self()
    // resolves here too.
    public function Self($data = null)
    {
        require_once __DIR__ . '/entity/self_entity.php';
        if ($data === null) {
            if ($this->_self === null) {
                $this->_self = new SelfEntity($this, null);
            }
            return $this->_self;
        }
        return new SelfEntity($this, $data);
    }


    private $_self_admin = null;

    // Canonical facade: $client->SelfAdmin()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->self_admin()
    // resolves here too.
    public function SelfAdmin($data = null)
    {
        require_once __DIR__ . '/entity/self_admin_entity.php';
        if ($data === null) {
            if ($this->_self_admin === null) {
                $this->_self_admin = new SelfAdminEntity($this, null);
            }
            return $this->_self_admin;
        }
        return new SelfAdminEntity($this, $data);
    }


    private $_template = null;

    // Canonical facade: $client->Template()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->template()
    // resolves here too.
    public function Template($data = null)
    {
        require_once __DIR__ . '/entity/template_entity.php';
        if ($data === null) {
            if ($this->_template === null) {
                $this->_template = new TemplateEntity($this, null);
            }
            return $this->_template;
        }
        return new TemplateEntity($this, $data);
    }


    private $_traffic = null;

    // Canonical facade: $client->Traffic()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->traffic()
    // resolves here too.
    public function Traffic($data = null)
    {
        require_once __DIR__ . '/entity/traffic_entity.php';
        if ($data === null) {
            if ($this->_traffic === null) {
                $this->_traffic = new TrafficEntity($this, null);
            }
            return $this->_traffic;
        }
        return new TrafficEntity($this, $data);
    }


    private $_traffic_file = null;

    // Canonical facade: $client->TrafficFile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->traffic_file()
    // resolves here too.
    public function TrafficFile($data = null)
    {
        require_once __DIR__ . '/entity/traffic_file_entity.php';
        if ($data === null) {
            if ($this->_traffic_file === null) {
                $this->_traffic_file = new TrafficFileEntity($this, null);
            }
            return $this->_traffic_file;
        }
        return new TrafficFileEntity($this, $data);
    }


    private $_variable = null;

    // Canonical facade: $client->Variable()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->variable()
    // resolves here too.
    public function Variable($data = null)
    {
        require_once __DIR__ . '/entity/variable_entity.php';
        if ($data === null) {
            if ($this->_variable === null) {
                $this->_variable = new VariableEntity($this, null);
            }
            return $this->_variable;
        }
        return new VariableEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new LmMultichannelSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
