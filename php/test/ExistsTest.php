<?php
declare(strict_types=1);

// LmMultichannel SDK exists test

require_once __DIR__ . '/../lmmultichannel_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = LmMultichannelSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
