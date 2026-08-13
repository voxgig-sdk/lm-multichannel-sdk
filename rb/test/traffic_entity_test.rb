# Traffic entity test

require "minitest/autorun"
require "json"
require_relative "../LmMultichannel_sdk"
require_relative "runner"

class TrafficEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmMultichannelSDK.test(nil, nil)
    ent = testsdk.Traffic(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = traffic_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    [].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "traffic." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LM_MULTICHANNEL_TEST_TRAFFIC_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    traffic_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.traffic")))
    traffic_ref01_data = nil
    if traffic_ref01_data_raw.length > 0
      traffic_ref01_data = Helpers.to_map(traffic_ref01_data_raw[0][1])
    end

  end
end

def traffic_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "traffic", "TrafficTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmMultichannelSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["traffic01", "traffic02", "traffic03", "file01", "file02", "file03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LM_MULTICHANNEL_TEST_TRAFFIC_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LM_MULTICHANNEL_TEST_TRAFFIC_ENTID" => idmap,
    "LM_MULTICHANNEL_TEST_LIVE" => "FALSE",
    "LM_MULTICHANNEL_TEST_EXPLAIN" => "FALSE",
    "LM_MULTICHANNEL_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LM_MULTICHANNEL_TEST_TRAFFIC_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LM_MULTICHANNEL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["LM_MULTICHANNEL_APIKEY"],
      },
      extra || {},
    ])
    client = LmMultichannelSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LM_MULTICHANNEL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LM_MULTICHANNEL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
