# LmMultichannel SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LmMultichannelFeatures
  def self.make_feature(name)
    case name
    when "base"
      LmMultichannelBaseFeature.new
    when "debug"
      LmMultichannelDebugFeature.new
    when "idempotency"
      LmMultichannelIdempotencyFeature.new
    when "metrics"
      LmMultichannelMetricsFeature.new
    when "paging"
      LmMultichannelPagingFeature.new
    when "ratelimit"
      LmMultichannelRatelimitFeature.new
    when "retry"
      LmMultichannelRetryFeature.new
    when "test"
      LmMultichannelTestFeature.new
    when "timeout"
      LmMultichannelTimeoutFeature.new
    else
      LmMultichannelBaseFeature.new
    end
  end
end
