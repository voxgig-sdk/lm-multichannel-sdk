<?php
declare(strict_types=1);

// LmMultichannel SDK utility: result_body

class LmMultichannelResultBody
{
    public static function call(LmMultichannelContext $ctx): ?LmMultichannelResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
