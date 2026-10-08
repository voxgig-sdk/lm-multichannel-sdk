# Variable direct test

import json
import pytest

from lmmultichannel_sdk.utility.voxgig_struct import voxgig_struct as vs
from lmmultichannel_sdk import LmMultichannelSDK
from lmmultichannel_sdk.core import helpers
from test import runner


# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


def _live_ok(result):
    status = helpers.to_int(result.get("status"))
    return result.get("err") is None and bool(result.get("ok")) and 200 <= status < 300


class TestVariableDirect:

    def test_should_direct_list_variable(self):
        setup = _variable_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-variable", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["template01"]:
                if setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live test blocked: needs {_live_key} via LM_MULTICHANNEL_TEST_VARIABLE_ENTID")

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["template_id"] = setup["idmap"].get("template01")
        else:
            params["template_id"] = "direct01"

        result = client.direct({
            "path": "templates/{template_id}/variables",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live list failed: " + runner.live_describe(result))
            if runner.live_list(result.get("data")) is None:
                runner.live_miss(LIVE_STRICT, "Live list returned no list: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _variable_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "LM_MULTICHANNEL_TEST_VARIABLE_ENTID": {},
        "LM_MULTICHANNEL_TEST_LIVE": "FALSE",
        "LM_MULTICHANNEL_APIKEY": "",
    })

    live = env.get("LM_MULTICHANNEL_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
            "apikey": env.get("LM_MULTICHANNEL_APIKEY"),
        })
        client = LmMultichannelSDK(merged_opts)
        idmap = env.get("LM_MULTICHANNEL_TEST_VARIABLE_ENTID")
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": idmap if isinstance(idmap, dict) else {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = LmMultichannelSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
