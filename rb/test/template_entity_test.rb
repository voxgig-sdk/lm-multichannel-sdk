# Template entity test

require "minitest/autorun"
require "json"
require_relative "../LmMultichannel_sdk"
require_relative "runner"

class TemplateEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmMultichannelSDK.test(nil, nil)
    ent = testsdk.Template(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "template" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = LmMultichannelSDK.test(seed, nil)
    seen = base.Template(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = LmMultichannelConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = LmMultichannelSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Template(nil).stream("list", nil, nil).each do |item|
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
    setup = template_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "template." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LM_MULTICHANNEL_TEST_TEMPLATE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    template_ref01_ent = client.Template(nil)
    template_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.template"), "template_ref01"))

    template_ref01_data_result = template_ref01_ent.create(template_ref01_data, nil)
    template_ref01_data = Helpers.to_map(template_ref01_data_result.respond_to?(:data_get) ? template_ref01_data_result.data_get : template_ref01_data_result)
    assert !template_ref01_data.nil?

    # LIST
    template_ref01_match = {}

    template_ref01_list_result = template_ref01_ent.list(template_ref01_match, nil)
    assert template_ref01_list_result.is_a?(Array)

    # UPDATE
    template_ref01_data_up0_up = {
    }

    template_ref01_markdef_up0_name = "createdOn"
    template_ref01_markdef_up0_value = "Mark01-template_ref01_#{setup[:now]}"
    template_ref01_data_up0_up[template_ref01_markdef_up0_name] = template_ref01_markdef_up0_value

    template_ref01_resdata_up0_result = template_ref01_ent.update(template_ref01_data_up0_up, nil)
    template_ref01_resdata_up0 = Helpers.to_map(template_ref01_resdata_up0_result.respond_to?(:data_get) ? template_ref01_resdata_up0_result.data_get : template_ref01_resdata_up0_result)
    assert !template_ref01_resdata_up0.nil?
    assert_equal template_ref01_resdata_up0[template_ref01_markdef_up0_name], template_ref01_markdef_up0_value

    # LOAD
    template_ref01_match_dt0 = {}
    template_ref01_data_dt0_loaded = template_ref01_ent.load(template_ref01_match_dt0, nil)
    assert !template_ref01_data_dt0_loaded.nil?


    # LIST
    template_ref01_match_rt0 = {}

    template_ref01_list_rt0_result = template_ref01_ent.list(template_ref01_match_rt0, nil)
    assert template_ref01_list_rt0_result.is_a?(Array)

  end
end

def template_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "template", "TemplateTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmMultichannelSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["template01", "template02", "template03", "review01", "review02", "review03"],
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
  entid_env_raw = ENV["LM_MULTICHANNEL_TEST_TEMPLATE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LM_MULTICHANNEL_TEST_TEMPLATE_ENTID" => idmap,
    "LM_MULTICHANNEL_TEST_LIVE" => "FALSE",
    "LM_MULTICHANNEL_TEST_EXPLAIN" => "FALSE",
    "LM_MULTICHANNEL_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LM_MULTICHANNEL_TEST_TEMPLATE_ENTID"])
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
