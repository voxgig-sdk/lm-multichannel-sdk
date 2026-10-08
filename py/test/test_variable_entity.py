# Variable entity test

import json
import os
import time

import pytest

from lmmultichannel_sdk.utility.voxgig_struct import voxgig_struct as vs
from lmmultichannel_sdk import LmMultichannelSDK
from lmmultichannel_sdk.core import helpers
from lmmultichannel_sdk.config import shared_config
from lmmultichannel_sdk.feature.base_feature import LmMultichannelBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestVariableEntity:

    def test_should_create_instance(self):
        testsdk = LmMultichannelSDK.test(None, None)
        ent = testsdk.Variable(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = LmMultichannelSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Variable(None).list({"template_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _variable_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "variable." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["template01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via LM_MULTICHANNEL_TEST_VARIABLE_ENTID")
        client = setup["client"]

        # CREATE
        variable_ref01_ent = client.Variable(None)
        variable_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.variable"), "variable_ref01"))
        variable_ref01_data["template_id"] = setup["idmap"]["template01"]

        variable_ref01_data = helpers.to_map(runner.entity_data(variable_ref01_ent.create(variable_ref01_data, None)))
        assert variable_ref01_data is not None

        # LIST
        variable_ref01_match = {
            "template_id": setup["idmap"]["template01"],
        }

        variable_ref01_list_result = variable_ref01_ent.list(variable_ref01_match, None)
        assert isinstance(variable_ref01_list_result, list)

        # UPDATE
        variable_ref01_data_up0_up = {
        }

        variable_ref01_markdef_up0_name = "description"
        variable_ref01_markdef_up0_value = "Mark01-variable_ref01_" + str(setup["now"])
        variable_ref01_data_up0_up[variable_ref01_markdef_up0_name] = variable_ref01_markdef_up0_value

        variable_ref01_resdata_up0 = helpers.to_map(runner.entity_data(variable_ref01_ent.update(variable_ref01_data_up0_up, None)))
        assert variable_ref01_resdata_up0 is not None
        assert variable_ref01_resdata_up0[variable_ref01_markdef_up0_name] == variable_ref01_markdef_up0_value



def _variable_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/variable/VariableTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LmMultichannelSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["variable01", "variable02", "variable03", "template01", "template02", "template03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "LM_MULTICHANNEL_TEST_VARIABLE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LM_MULTICHANNEL_TEST_VARIABLE_ENTID": idmap,
        "LM_MULTICHANNEL_TEST_LIVE": "FALSE",
        "LM_MULTICHANNEL_TEST_EXPLAIN": "FALSE",
        "LM_MULTICHANNEL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("LM_MULTICHANNEL_TEST_VARIABLE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("LM_MULTICHANNEL_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("LM_MULTICHANNEL_APIKEY"),
            },
            extra or {},
        ])
        client = LmMultichannelSDK(helpers.to_map(merged_opts))

    _live = env.get("LM_MULTICHANNEL_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LM_MULTICHANNEL_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
