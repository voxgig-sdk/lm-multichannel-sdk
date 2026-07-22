# LmMultichannel SDK exists test

require "minitest/autorun"
require_relative "../LmMultichannel_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LmMultichannelSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
