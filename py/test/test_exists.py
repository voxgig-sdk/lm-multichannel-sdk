# LmMultichannel SDK exists test

import pytest
from lmmultichannel_sdk import LmMultichannelSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LmMultichannelSDK.test(None, None)
        assert testsdk is not None
