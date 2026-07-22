# LmMultichannel SDK feature factory

from feature.base_feature import LmMultichannelBaseFeature
from feature.test_feature import LmMultichannelTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LmMultichannelBaseFeature(),
        "test": lambda: LmMultichannelTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
