# LmMultichannel SDK feature factory

from lmmultichannel_sdk.feature.base_feature import LmMultichannelBaseFeature
from lmmultichannel_sdk.feature.debug_feature import LmMultichannelDebugFeature
from lmmultichannel_sdk.feature.idempotency_feature import LmMultichannelIdempotencyFeature
from lmmultichannel_sdk.feature.metrics_feature import LmMultichannelMetricsFeature
from lmmultichannel_sdk.feature.paging_feature import LmMultichannelPagingFeature
from lmmultichannel_sdk.feature.ratelimit_feature import LmMultichannelRatelimitFeature
from lmmultichannel_sdk.feature.retry_feature import LmMultichannelRetryFeature
from lmmultichannel_sdk.feature.test_feature import LmMultichannelTestFeature
from lmmultichannel_sdk.feature.timeout_feature import LmMultichannelTimeoutFeature


_FEATURES = {
    "base": lambda: LmMultichannelBaseFeature(),
    "debug": lambda: LmMultichannelDebugFeature(),
    "idempotency": lambda: LmMultichannelIdempotencyFeature(),
    "metrics": lambda: LmMultichannelMetricsFeature(),
    "paging": lambda: LmMultichannelPagingFeature(),
    "ratelimit": lambda: LmMultichannelRatelimitFeature(),
    "retry": lambda: LmMultichannelRetryFeature(),
    "test": lambda: LmMultichannelTestFeature(),
    "timeout": lambda: LmMultichannelTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
