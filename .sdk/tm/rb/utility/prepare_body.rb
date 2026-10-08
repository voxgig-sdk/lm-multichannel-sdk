# LmMultichannel SDK utility: prepare_body
require_relative 'media'
module LmMultichannelUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return LmMultichannelUtilities.raw_body(ctx.reqdata) if LmMultichannelUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
