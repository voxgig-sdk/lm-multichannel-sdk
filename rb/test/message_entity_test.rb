# Message entity test

require "minitest/autorun"
require "json"
require_relative "../LmMultichannel_sdk"
require_relative "runner"

class MessageEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmMultichannelSDK.test(nil, nil)
    ent = testsdk.Message(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = message_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "message." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LMMULTICHANNEL_TEST_MESSAGE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    message_ref01_ent = client.Message(nil)
    message_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.message"), "message_ref01"))

    message_ref01_data_result = message_ref01_ent.create(message_ref01_data, nil)
    message_ref01_data = Helpers.to_map(message_ref01_data_result)
    assert !message_ref01_data.nil?

    # LOAD
    message_ref01_match_dt0 = {}
    message_ref01_data_dt0_loaded = message_ref01_ent.load(message_ref01_match_dt0, nil)
    assert !message_ref01_data_dt0_loaded.nil?


  end
end

def message_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "message", "MessageTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmMultichannelSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["message01", "message02", "message03"],
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
  entid_env_raw = ENV["LMMULTICHANNEL_TEST_MESSAGE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LMMULTICHANNEL_TEST_MESSAGE_ENTID" => idmap,
    "LMMULTICHANNEL_TEST_LIVE" => "FALSE",
    "LMMULTICHANNEL_TEST_EXPLAIN" => "FALSE",
    "LMMULTICHANNEL_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LMMULTICHANNEL_TEST_MESSAGE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LMMULTICHANNEL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["LMMULTICHANNEL_APIKEY"],
      },
      extra || {},
    ])
    client = LmMultichannelSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LMMULTICHANNEL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LMMULTICHANNEL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
