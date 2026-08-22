<?php
declare(strict_types=1);

// Typed models for the LmMultichannel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Content entity data model. */
class Content
{
    public ?array $card = null;
    public array $carousel;
    public array $content;
    public array $fromTemplate;
    public array $location;
    public array $media;
    public ?array $suggestions = null;
    public ?string $text = null;
}

/** Request payload for Content#load. */
class ContentLoadMatch
{
    public string $template_id;
}

/** Request payload for Content#create. */
class ContentCreateData
{
    public string $template_id;
    public ?array $card = null;
    public array $carousel;
    public array $content;
    public array $fromTemplate;
    public array $location;
    public array $media;
    public ?array $suggestions = null;
    public ?string $text = null;
}

/** Message entity data model. */
class Message
{
    public ?string $campaignId = null;
    public array $messages;
    public string $scheduleAt;
}

/** Request payload for Message#load. */
class MessageLoadMatch
{
    public string $id;
}

/** Request payload for Message#create. */
class MessageCreateData
{
    public ?string $campaignId = null;
    public array $messages;
    public string $scheduleAt;
}

/** Request payload for Message#remove. */
class MessageRemoveMatch
{
    public string $id;
}

/** MessageEvent entity data model. */
class MessageEvent
{
    public string $accountId;
    public string $eventId;
    public array $messageStatusChanged;
    public string $on;
    public array $templateReviewStatusChanged;
    public array $userMessageReceived;
}

/** Request payload for MessageEvent#list. */
class MessageEventListMatch
{
    public string $id;
}

/** Option entity data model. */
class Option
{
    public array $options;
}

/** Request payload for Option#load. */
class OptionLoadMatch
{
    public string $template_id;
}

/** Request payload for Option#create. */
class OptionCreateData
{
    public string $template_id;
    public array $options;
}

/** Request payload for Option#update. */
class OptionUpdateData
{
    public string $template_id;
    public ?array $options = null;
}

/** Schedule entity data model. */
class Schedule
{
    public int $count;
}

/** Request payload for Schedule#load. */
class ScheduleLoadMatch
{
    public ?int $count = null;
}

/** Request payload for Schedule#remove. */
class ScheduleRemoveMatch
{
    public ?int $count = null;
}

/** Self entity data model. */
class SelfType
{
    public string $accountId;
    public array $settings;
}

/** Request payload for Self#load. */
class SelfLoadMatch
{
    public ?string $accountId = null;
    public ?array $settings = null;
}

/** SelfAdmin entity data model. */
class SelfAdmin
{
    public array $callback;
    public array $settings;
}

/** Request payload for SelfAdmin#update. */
class SelfAdminUpdateData
{
    public ?array $callback = null;
    public ?array $settings = null;
}

/** Template entity data model. */
class Template
{
    public ?array $channelData = null;
    public ?array $content = null;
    public string $createdOn;
    public ?string $designerUrl = null;
    public ?string $details = null;
    public ?array $meta = null;
    public string $occurredOn;
    public ?array $options = null;
    public ?array $reviews = null;
    public string $status;
    public array $template;
    public string $templateId;
    public ?string $updatedOn = null;
    public ?array $variables = null;
}

/** Request payload for Template#load. */
class TemplateLoadMatch
{
    public ?string $channel_id = null;
    public string $id;
}

/** Request payload for Template#list. */
class TemplateListMatch
{
    public ?array $channelData = null;
    public ?array $content = null;
    public ?string $createdOn = null;
    public ?string $designerUrl = null;
    public ?string $details = null;
    public ?array $meta = null;
    public ?string $occurredOn = null;
    public ?array $options = null;
    public ?array $reviews = null;
    public ?string $status = null;
    public ?array $template = null;
    public ?string $templateId = null;
    public ?string $updatedOn = null;
    public ?array $variables = null;
}

/** Request payload for Template#create. */
class TemplateCreateData
{
    public ?array $channelData = null;
    public ?array $content = null;
    public string $createdOn;
    public ?string $designerUrl = null;
    public ?string $details = null;
    public ?array $meta = null;
    public string $occurredOn;
    public ?array $options = null;
    public ?array $reviews = null;
    public string $status;
    public array $template;
    public string $templateId;
    public ?string $updatedOn = null;
    public ?array $variables = null;
}

/** Request payload for Template#update. */
class TemplateUpdateData
{
    public string $channel_id;
    public string $id;
    public ?array $channelData = null;
    public ?array $content = null;
    public ?string $createdOn = null;
    public ?string $designerUrl = null;
    public ?string $details = null;
    public ?array $meta = null;
    public ?string $occurredOn = null;
    public ?array $options = null;
    public ?array $reviews = null;
    public ?string $status = null;
    public ?array $template = null;
    public ?string $templateId = null;
    public ?string $updatedOn = null;
    public ?array $variables = null;
}

/** Request payload for Template#remove. */
class TemplateRemoveMatch
{
    public ?string $channel_id = null;
    public string $id;
}

/** Traffic entity data model. */
class Traffic
{
}

/** Request payload for Traffic#remove. */
class TrafficRemoveMatch
{
    public string $path;
}

/** TrafficFile entity data model. */
class TrafficFile
{
    public array $files;
    public string $path;
    public string $url;
}

/** Request payload for TrafficFile#load. */
class TrafficFileLoadMatch
{
    public string $id;
}

/** Request payload for TrafficFile#list. */
class TrafficFileListMatch
{
    public ?array $files = null;
    public ?string $path = null;
    public ?string $url = null;
}

/** Variable entity data model. */
class Variable
{
    public ?string $description = null;
    public ?array $examples = null;
    public ?array $formats = null;
    public string $name;
    public ?string $ref = null;
    public ?string $type = null;
    public array $variables;
}

/** Request payload for Variable#list. */
class VariableListMatch
{
    public string $template_id;
}

/** Request payload for Variable#create. */
class VariableCreateData
{
    public string $template_id;
    public ?string $description = null;
    public ?array $examples = null;
    public ?array $formats = null;
    public string $name;
    public ?string $ref = null;
    public ?string $type = null;
    public array $variables;
}

/** Request payload for Variable#update. */
class VariableUpdateData
{
    public string $template_id;
    public ?string $description = null;
    public ?array $examples = null;
    public ?array $formats = null;
    public ?string $name = null;
    public ?string $ref = null;
    public ?string $type = null;
    public ?array $variables = null;
}

