<?php
declare(strict_types=1);

// LmMultichannel SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LmMultichannelFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LmMultichannelBaseFeature();
            case "test":
                return new LmMultichannelTestFeature();
            default:
                return new LmMultichannelBaseFeature();
        }
    }
}
