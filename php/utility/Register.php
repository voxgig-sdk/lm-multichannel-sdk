<?php
declare(strict_types=1);

// LmMultichannel SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

LmMultichannelUtility::setRegistrar(function (LmMultichannelUtility $u): void {
    $u->clean = [LmMultichannelClean::class, 'call'];
    $u->done = [LmMultichannelDone::class, 'call'];
    $u->make_error = [LmMultichannelMakeError::class, 'call'];
    $u->feature_add = [LmMultichannelFeatureAdd::class, 'call'];
    $u->feature_hook = [LmMultichannelFeatureHook::class, 'call'];
    $u->feature_init = [LmMultichannelFeatureInit::class, 'call'];
    $u->fetcher = [LmMultichannelFetcher::class, 'call'];
    $u->make_fetch_def = [LmMultichannelMakeFetchDef::class, 'call'];
    $u->make_context = [LmMultichannelMakeContext::class, 'call'];
    $u->make_options = [LmMultichannelMakeOptions::class, 'call'];
    $u->make_request = [LmMultichannelMakeRequest::class, 'call'];
    $u->make_response = [LmMultichannelMakeResponse::class, 'call'];
    $u->make_result = [LmMultichannelMakeResult::class, 'call'];
    $u->make_point = [LmMultichannelMakePoint::class, 'call'];
    $u->make_spec = [LmMultichannelMakeSpec::class, 'call'];
    $u->make_url = [LmMultichannelMakeUrl::class, 'call'];
    $u->param = [LmMultichannelParam::class, 'call'];
    $u->prepare_auth = [LmMultichannelPrepareAuth::class, 'call'];
    $u->prepare_body = [LmMultichannelPrepareBody::class, 'call'];
    $u->prepare_headers = [LmMultichannelPrepareHeaders::class, 'call'];
    $u->prepare_method = [LmMultichannelPrepareMethod::class, 'call'];
    $u->prepare_params = [LmMultichannelPrepareParams::class, 'call'];
    $u->prepare_path = [LmMultichannelPreparePath::class, 'call'];
    $u->prepare_query = [LmMultichannelPrepareQuery::class, 'call'];
    $u->result_basic = [LmMultichannelResultBasic::class, 'call'];
    $u->result_body = [LmMultichannelResultBody::class, 'call'];
    $u->result_headers = [LmMultichannelResultHeaders::class, 'call'];
    $u->transform_request = [LmMultichannelTransformRequest::class, 'call'];
    $u->transform_response = [LmMultichannelTransformResponse::class, 'call'];
});
