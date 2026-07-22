# LmMultichannel SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LmMultichannelFeatures
  def self.make_feature(name)
    case name
    when "base"
      LmMultichannelBaseFeature.new
    when "test"
      LmMultichannelTestFeature.new
    else
      LmMultichannelBaseFeature.new
    end
  end
end
