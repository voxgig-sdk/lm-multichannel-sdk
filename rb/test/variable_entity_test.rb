# Variable entity test

require "minitest/autorun"
require "json"
require_relative "../LmMultichannel_sdk"
require_relative "runner"

class VariableEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = LmMultichannelSDK.test(nil, nil)
    ent = testsdk.Variable(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = LmMultichannelConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = LmMultichannelSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Variable(nil).list({ "template_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
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
    if setup[:live]
      ["template01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via LM_MULTICHANNEL_TEST_VARIABLE_ENTID")
        end
      end
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
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
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
