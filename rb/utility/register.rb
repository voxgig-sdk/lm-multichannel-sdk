# LmMultichannel SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LmMultichannelUtility.registrar = ->(u) {
  u.clean = LmMultichannelUtilities::Clean
  u.done = LmMultichannelUtilities::Done
  u.make_error = LmMultichannelUtilities::MakeError
  u.feature_add = LmMultichannelUtilities::FeatureAdd
  u.feature_hook = LmMultichannelUtilities::FeatureHook
  u.feature_init = LmMultichannelUtilities::FeatureInit
  u.fetcher = LmMultichannelUtilities::Fetcher
  u.make_fetch_def = LmMultichannelUtilities::MakeFetchDef
  u.make_context = LmMultichannelUtilities::MakeContext
  u.make_options = LmMultichannelUtilities::MakeOptions
  u.make_request = LmMultichannelUtilities::MakeRequest
  u.make_response = LmMultichannelUtilities::MakeResponse
  u.make_result = LmMultichannelUtilities::MakeResult
  u.make_point = LmMultichannelUtilities::MakePoint
  u.make_spec = LmMultichannelUtilities::MakeSpec
  u.make_url = LmMultichannelUtilities::MakeUrl
  u.param = LmMultichannelUtilities::Param
  u.prepare_auth = LmMultichannelUtilities::PrepareAuth
  u.prepare_body = LmMultichannelUtilities::PrepareBody
  u.prepare_headers = LmMultichannelUtilities::PrepareHeaders
  u.prepare_method = LmMultichannelUtilities::PrepareMethod
  u.prepare_params = LmMultichannelUtilities::PrepareParams
  u.prepare_path = LmMultichannelUtilities::PreparePath
  u.prepare_query = LmMultichannelUtilities::PrepareQuery
  u.result_basic = LmMultichannelUtilities::ResultBasic
  u.result_body = LmMultichannelUtilities::ResultBody
  u.result_headers = LmMultichannelUtilities::ResultHeaders
  u.transform_request = LmMultichannelUtilities::TransformRequest
  u.transform_response = LmMultichannelUtilities::TransformResponse
}
