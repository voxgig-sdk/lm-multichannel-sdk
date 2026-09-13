# Option entity test

import json
import os
import time

import pytest

from lmmultichannel_sdk.utility.voxgig_struct import voxgig_struct as vs
from lmmultichannel_sdk import LmMultichannelSDK
from lmmultichannel_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestOptionEntity:

    def test_should_create_instance(self):
        testsdk = LmMultichannelSDK.test(None, None)
        ent = testsdk.Option(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _option_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "option." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LM_MULTICHANNEL_TEST_OPTION_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        option_ref01_ent = client.Option(None)
        option_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.option"), "option_ref01"))
        option_ref01_data["template_id"] = setup["idmap"]["template01"]

        option_ref01_data = helpers.to_map(runner.entity_data(option_ref01_ent.create(option_ref01_data, None)))
        assert option_ref01_data is not None

        # UPDATE
        option_ref01_data_up0_up = {
        }

        option_ref01_resdata_up0 = helpers.to_map(runner.entity_data(option_ref01_ent.update(option_ref01_data_up0_up, None)))
        assert option_ref01_resdata_up0 is not None

        # LOAD
        option_ref01_match_dt0 = {}
        option_ref01_data_dt0_loaded = option_ref01_ent.load(option_ref01_match_dt0, None)
        assert option_ref01_data_dt0_loaded is not None



def _option_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/option/OptionTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LmMultichannelSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["option01", "option02", "option03", "template01", "template02", "template03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "LM_MULTICHANNEL_TEST_OPTION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LM_MULTICHANNEL_TEST_OPTION_ENTID": idmap,
        "LM_MULTICHANNEL_TEST_LIVE": "FALSE",
        "LM_MULTICHANNEL_TEST_EXPLAIN": "FALSE",
        "LM_MULTICHANNEL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("LM_MULTICHANNEL_TEST_OPTION_ENTID"))
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
