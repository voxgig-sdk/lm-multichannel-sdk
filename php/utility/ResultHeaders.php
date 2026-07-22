<?php
declare(strict_types=1);

// LmMultichannel SDK utility: result_headers

class LmMultichannelResultHeaders
{
    public static function call(LmMultichannelContext $ctx): ?LmMultichannelResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
