<?php
declare(strict_types=1);

// LmMultichannel SDK base feature

class LmMultichannelBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LmMultichannelContext $ctx, array $options): void {}
    public function PostConstruct(LmMultichannelContext $ctx): void {}
    public function PostConstructEntity(LmMultichannelContext $ctx): void {}
    public function SetData(LmMultichannelContext $ctx): void {}
    public function GetData(LmMultichannelContext $ctx): void {}
    public function GetMatch(LmMultichannelContext $ctx): void {}
    public function SetMatch(LmMultichannelContext $ctx): void {}
    public function PrePoint(LmMultichannelContext $ctx): void {}
    public function PreSpec(LmMultichannelContext $ctx): void {}
    public function PreRequest(LmMultichannelContext $ctx): void {}
    public function PreResponse(LmMultichannelContext $ctx): void {}
    public function PreResult(LmMultichannelContext $ctx): void {}
    public function PreDone(LmMultichannelContext $ctx): void {}
    public function PreUnexpected(LmMultichannelContext $ctx): void {}
}
