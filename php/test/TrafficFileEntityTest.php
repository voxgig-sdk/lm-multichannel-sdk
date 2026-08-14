<?php
declare(strict_types=1);

// TrafficFile entity test

require_once __DIR__ . '/../lmmultichannel_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class TrafficFileEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LmMultichannelSDK::test(null, null);
        $ent = $testsdk->TrafficFile(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "traffic_file" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = LmMultichannelSDK::test($seed, null);
        $seen = iterator_to_array($base->TrafficFile(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = LmMultichannelConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = LmMultichannelSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->TrafficFile(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = traffic_file_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "traffic_file." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $traffic_file_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.traffic_file")));
        $traffic_file_ref01_data = null;
        if (count($traffic_file_ref01_data_raw) > 0) {
            $traffic_file_ref01_data = Helpers::to_map($traffic_file_ref01_data_raw[0][1]);
        }

        // LIST
        $traffic_file_ref01_ent = $client->TrafficFile(null);
        $traffic_file_ref01_match = [];

        $traffic_file_ref01_list_result = $traffic_file_ref01_ent->list($traffic_file_ref01_match, null);
        $this->assertIsArray($traffic_file_ref01_list_result);

        // LOAD
        $traffic_file_ref01_match_dt0 = [];
        $traffic_file_ref01_data_dt0_loaded = $traffic_file_ref01_ent->load($traffic_file_ref01_match_dt0, null);
        $this->assertNotNull($traffic_file_ref01_data_dt0_loaded);

    }
}

function traffic_file_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/traffic_file/TrafficFileTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LmMultichannelSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["traffic_file01", "traffic_file02", "traffic_file03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID" => $idmap,
        "LM_MULTICHANNEL_TEST_LIVE" => "FALSE",
        "LM_MULTICHANNEL_TEST_EXPLAIN" => "FALSE",
        "LM_MULTICHANNEL_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LM_MULTICHANNEL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["LM_MULTICHANNEL_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new LmMultichannelSDK(Helpers::to_map($merged_opts));
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
