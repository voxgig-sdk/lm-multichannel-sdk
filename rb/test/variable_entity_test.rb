# Variable entity test

require "minitest/autorun"
require "json"
require_relative "../LmMultichannel_sdk"
require_relative "runner"

class VariableEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmMultichannelSDK.test(nil, nil)
    ent = testsdk.Variable(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "variable" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = LmMultichannelSDK.test(seed, nil)
    seen = base.Variable(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = LmMultichannelConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = LmMultichannelSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Variable(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = variable_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "variable." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LM_MULTICHANNEL_TEST_VARIABLE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    variable_ref01_ent = client.Variable(nil)
    variable_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.variable"), "variable_ref01"))
    variable_ref01_data["template_id"] = setup[:idmap]["template01"]

    variable_ref01_data_result = variable_ref01_ent.create(variable_ref01_data, nil)
    variable_ref01_data = Helpers.to_map(variable_ref01_data_result.respond_to?(:data_get) ? variable_ref01_data_result.data_get : variable_ref01_data_result)
    assert !variable_ref01_data.nil?

    # LIST
    variable_ref01_match = {
      "template_id" => setup[:idmap]["template01"],
    }

    variable_ref01_list_result = variable_ref01_ent.list(variable_ref01_match, nil)
    assert variable_ref01_list_result.is_a?(Array)

    # UPDATE
    variable_ref01_data_up0_up = {
    }

    variable_ref01_markdef_up0_name = "description"
    variable_ref01_markdef_up0_value = "Mark01-variable_ref01_#{setup[:now]}"
    variable_ref01_data_up0_up[variable_ref01_markdef_up0_name] = variable_ref01_markdef_up0_value

    variable_ref01_resdata_up0_result = variable_ref01_ent.update(variable_ref01_data_up0_up, nil)
    variable_ref01_resdata_up0 = Helpers.to_map(variable_ref01_resdata_up0_result.respond_to?(:data_get) ? variable_ref01_resdata_up0_result.data_get : variable_ref01_resdata_up0_result)
    assert !variable_ref01_resdata_up0.nil?
    assert_equal variable_ref01_resdata_up0[variable_ref01_markdef_up0_name], variable_ref01_markdef_up0_value

  end
end

def variable_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "variable", "VariableTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmMultichannelSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["variable01", "variable02", "variable03", "template01", "template02", "template03"],
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
  entid_env_raw = ENV["LM_MULTICHANNEL_TEST_VARIABLE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LM_MULTICHANNEL_TEST_VARIABLE_ENTID" => idmap,
    "LM_MULTICHANNEL_TEST_LIVE" => "FALSE",
    "LM_MULTICHANNEL_TEST_EXPLAIN" => "FALSE",
    "LM_MULTICHANNEL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["LM_MULTICHANNEL_TEST_VARIABLE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LM_MULTICHANNEL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
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
