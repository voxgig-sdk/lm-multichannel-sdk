<?php
declare(strict_types=1);

// Option entity test

require_once __DIR__ . '/../lmmultichannel_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OptionEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = LmMultichannelSDK::test(null, null);
        $ent = $testsdk->Option(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = LmMultichannelConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = LmMultichannelSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Option(null)->load(["template_id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = option_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "option." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"])) {
            foreach (["template01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via LM_MULTICHANNEL_TEST_OPTION_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // CREATE
        $option_ref01_ent = $client->Option(null);
        $option_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.option"), "option_ref01"));
        $option_ref01_data["template_id"] = $setup["idmap"]["template01"];

        $option_ref01_data_result = $option_ref01_ent->create($option_ref01_data, null);
        $option_ref01_data = Helpers::to_map(is_object($option_ref01_data_result) && method_exists($option_ref01_data_result, 'data_get') ? $option_ref01_data_result->data_get() : $option_ref01_data_result);
        $this->assertNotNull($option_ref01_data);

        // UPDATE
        $option_ref01_data_up0_up = [
        ];

        $option_ref01_resdata_up0_result = $option_ref01_ent->update($option_ref01_data_up0_up, null);
        $option_ref01_resdata_up0 = Helpers::to_map(is_object($option_ref01_resdata_up0_result) && method_exists($option_ref01_resdata_up0_result, 'data_get') ? $option_ref01_resdata_up0_result->data_get() : $option_ref01_resdata_up0_result);
        $this->assertNotNull($option_ref01_resdata_up0);

        // LOAD
        $option_ref01_match_dt0 = [];
        $option_ref01_data_dt0_loaded = $option_ref01_ent->load($option_ref01_match_dt0, null);
        $this->assertNotNull($option_ref01_data_dt0_loaded);

    }
}

function option_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/option/OptionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LmMultichannelSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["option01", "option02", "option03", "template01", "template02", "template03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("LM_MULTICHANNEL_TEST_OPTION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LM_MULTICHANNEL_TEST_OPTION_ENTID" => $idmap,
        "LM_MULTICHANNEL_TEST_LIVE" => "FALSE",
        "LM_MULTICHANNEL_TEST_EXPLAIN" => "FALSE",
        "LM_MULTICHANNEL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LM_MULTICHANNEL_TEST_OPTION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LM_MULTICHANNEL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["LM_MULTICHANNEL_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new LmMultichannelSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["LM_MULTICHANNEL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LM_MULTICHANNEL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
