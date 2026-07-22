# LmMultichannel SDK utility: make_context
require_relative '../core/context'
module LmMultichannelUtilities
  MakeContext = ->(ctxmap, basectx) {
    LmMultichannelContext.new(ctxmap, basectx)
  }
end
