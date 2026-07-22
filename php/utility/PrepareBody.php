<?php
declare(strict_types=1);

// LmMultichannel SDK utility: prepare_body

class LmMultichannelPrepareBody
{
    public static function call(LmMultichannelContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
