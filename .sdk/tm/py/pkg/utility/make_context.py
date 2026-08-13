# LmMultichannel SDK utility: make_context

from projectname_sdk.core.context import LmMultichannelContext


def make_context_util(ctxmap, basectx):
    return LmMultichannelContext(ctxmap, basectx)
