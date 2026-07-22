<?php
declare(strict_types=1);

// LmMultichannel SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LmMultichannelMakeContext
{
    public static function call(array $ctxmap, ?LmMultichannelContext $basectx): LmMultichannelContext
    {
        return new LmMultichannelContext($ctxmap, $basectx);
    }
}
