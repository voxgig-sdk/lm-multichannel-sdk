# LmMultichannel PHP SDK



The PHP SDK for the LmMultichannel API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Content()` — with named operations (`list`/`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/lm-multichannel-sdk/releases](https://github.com/voxgig-sdk/lm-multichannel-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'lmmultichannel_sdk.php';

$client = new LmMultichannelSDK([
    "apikey" => getenv("LM_MULTICHANNEL_APIKEY"),
]);
```

### 3. Load a content

Content is nested under template, so provide the `template_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Content record (throws on error).
    $content = $client->Content()->load(["template_id" => "example_template_id"]);
    print_r($content->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Content record.
$created = $client->Content()->create(["template_id" => "example_template_id", "carousel" => [], "content" => [], "fromTemplate" => [], "location" => [], "media" => []]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $message = $client->Message()->load(["id" => "example_id"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = LmMultichannelSDK::test([
    "entity" => ["message" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$message = $client->Message()->load(["id" => "test01"]);
print_r($message->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new LmMultichannelSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
LM_MULTICHANNEL_TEST_LIVE=TRUE
LM_MULTICHANNEL_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### LmMultichannelSDK

```php
require_once 'lmmultichannel_sdk.php';
$client = new LmMultichannelSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = LmMultichannelSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### LmMultichannelSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Content` | `($data): ContentEntity` | Create a Content entity instance. |
| `Message` | `($data): MessageEntity` | Create a Message entity instance. |
| `MessageEvent` | `($data): MessageEventEntity` | Create a MessageEvent entity instance. |
| `Option` | `($data): OptionEntity` | Create an Option entity instance. |
| `Schedule` | `($data): ScheduleEntity` | Create a Schedule entity instance. |
| `Self` | `($data): SelfEntity` | Create a Self entity instance. |
| `SelfAdmin` | `($data): SelfAdminEntity` | Create a SelfAdmin entity instance. |
| `Template` | `($data): TemplateEntity` | Create a Template entity instance. |
| `Traffic` | `($data): TrafficEntity` | Create a Traffic entity instance. |
| `TrafficFile` | `($data): TrafficFileEntity` | Create a TrafficFile entity instance. |
| `Variable` | `($data): VariableEntity` | Create a Variable entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Content

| Field | Description |
| --- | --- |
| `card` | Rich card containing media, text and/or buttons |
| `carousel` |  |
| `content` | Message content. |
| `fromTemplate` | Content generated from a pre-defined template |
| `location` |  |
| `media` |  |
| `suggestions` | Quick replies / suggestion buttons (not applicable to fromTemplate) |
| `text` | Simple text content |

Operations: Create, Load.

API path: `/templates/{templateId}/content`

#### Message

| Field | Description |
| --- | --- |
| `campaignId` | Schedule grouping identifier |
| `id` |  |
| `messages` |  |
| `scheduleAt` | Scheduled sending time |

Operations: Create, Load, Remove.

API path: `/messages`

#### MessageEvent

| Field | Description |
| --- | --- |
| `accountId` | Account identifier |
| `eventId` | Unique event identifier (for idempotent processing / deduplication) |
| `id` |  |
| `messageStatusChanged` |  |
| `on` | UTC date-time when the event occurred |
| `templateReviewStatusChanged` |  |
| `userMessageReceived` |  |

Operations: List.

API path: `/messages/{messageId}/events`

#### Option

| Field | Description |
| --- | --- |
| `options` |  |

Operations: Create, Load, Update.

API path: `/templates/{templateId}/options`

#### Schedule

| Field | Description |
| --- | --- |
| `count` | Number of active schedules |

Operations: Load, Remove.

API path: `/schedules:count`

#### Self

| Field | Description |
| --- | --- |
| `accountId` | Unique technical account identifier |
| `settings` |  |

Operations: Load.

API path: `/self`

#### SelfAdmin

| Field | Description |
| --- | --- |
| `callback` |  |
| `settings` |  |

Operations: Update.

API path: `/self/settings`

#### Template

| Field | Description |
| --- | --- |
| `channelData` |  |
| `content` | Message content. |
| `createdOn` | Date of template creation |
| `designerUrl` | URL to the external template designer (dynamically generated if enabled) |
| `details` | Additional details about the latest status |
| `id` |  |
| `meta` |  |
| `occurredOn` | Date and time of last review status change |
| `options` |  |
| `reviews` | Channel-specific template reviews (keyed by channelId) |
| `status` | Template review lifecycle status |
| `template` | Properties for creating a new template |
| `templateId` | Unique template identifier (generated by the service) |
| `updatedOn` | Date of last template update |
| `variables` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/templates/{templateId}/meta`

#### Traffic

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/traffic/files/{path}`

#### TrafficFile

| Field | Description |
| --- | --- |
| `files` |  |
| `id` |  |
| `path` | Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip |
| `url` | Absolute download URL with security token (expires after 15 minutes) |

Operations: List, Load.

API path: `/traffic/files`

#### Variable

| Field | Description |
| --- | --- |
| `description` | Variable description |
| `examples` | Example values |
| `formats` | Type-specific constraint formats (e.g. |
| `name` | Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+) |
| `ref` | Optional immutable identifier for the variable (used for merge identity) |
| `type` | Optional type descriptor for validation constraints |
| `variables` |  |

Operations: Create, List, Update.

API path: `/templates/{templateId}/variables`



## Entities


### Content

Create an instance: `$content = $client->Content();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `array` | Rich card containing media, text and/or buttons |
| `carousel` | `array` |  |
| `content` | `array` | Message content. |
| `fromTemplate` | `array` | Content generated from a pre-defined template |
| `location` | `array` |  |
| `media` | `array` |  |
| `suggestions` | `array` | Quick replies / suggestion buttons (not applicable to fromTemplate) |
| `text` | `string` | Simple text content |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Content record (throws on error).
$content = $client->Content()->load(["template_id" => "template_id"]);
```

#### Example: Create

```php
$content = $client->Content()->create([
    "template_id" => null, // string
    "carousel" => null, // array
    "content" => null, // array
    "fromTemplate" => null, // array
    "location" => null, // array
    "media" => null, // array
]);
```


### Message

Create an instance: `$message = $client->Message();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaignId` | `string` | Schedule grouping identifier |
| `id` | `string` |  |
| `messages` | `array` |  |
| `scheduleAt` | `string` | Scheduled sending time |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Message record (throws on error).
$message = $client->Message()->load(["id" => "message_id"]);
```

#### Example: Create

```php
$message = $client->Message()->create([
    "messages" => null, // array
    "scheduleAt" => null, // string
]);
```


### MessageEvent

Create an instance: `$message_event = $client->MessageEvent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `string` | Account identifier |
| `eventId` | `string` | Unique event identifier (for idempotent processing / deduplication) |
| `id` | `string` |  |
| `messageStatusChanged` | `array` |  |
| `on` | `string` | UTC date-time when the event occurred |
| `templateReviewStatusChanged` | `array` |  |
| `userMessageReceived` | `array` |  |

#### Example: List

```php
// list() returns an array of MessageEvent records (throws on error).
$message_events = $client->MessageEvent()->list();
```


### Option

Create an instance: `$option = $client->Option();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `options` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Option record (throws on error).
$option = $client->Option()->load(["template_id" => "template_id"]);
```

#### Example: Create

```php
$option = $client->Option()->create([
    "template_id" => null, // string
    "options" => null, // array
]);
```


### Schedule

Create an instance: `$schedule = $client->Schedule();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of active schedules |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Schedule record (throws on error).
$schedule = $client->Schedule()->load();
```


### Self

Create an instance: `$self = $client->Self();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `string` | Unique technical account identifier |
| `settings` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Self record (throws on error).
$self = $client->Self()->load();
```


### SelfAdmin

Create an instance: `$self_admin = $client->SelfAdmin();`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `callback` | `array` |  |
| `settings` | `array` |  |


### Template

Create an instance: `$template = $client->Template();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channelData` | `array` |  |
| `content` | `array` | Message content. |
| `createdOn` | `string` | Date of template creation |
| `designerUrl` | `string` | URL to the external template designer (dynamically generated if enabled) |
| `details` | `string` | Additional details about the latest status |
| `id` | `string` |  |
| `meta` | `array` |  |
| `occurredOn` | `string` | Date and time of last review status change |
| `options` | `array` |  |
| `reviews` | `array` | Channel-specific template reviews (keyed by channelId) |
| `status` | `string` | Template review lifecycle status |
| `template` | `array` | Properties for creating a new template |
| `templateId` | `string` | Unique template identifier (generated by the service) |
| `updatedOn` | `string` | Date of last template update |
| `variables` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Template record (throws on error).
$template = $client->Template()->load(["id" => "template_id"]);
```

#### Example: List

```php
// list() returns an array of Template records (throws on error).
$templates = $client->Template()->list();
```

#### Example: Create

```php
$template = $client->Template()->create([
    "createdOn" => null, // string
    "occurredOn" => null, // string
    "status" => null, // string
    "template" => null, // array
    "templateId" => null, // string
]);
```


### Traffic

Create an instance: `$traffic = $client->Traffic();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### TrafficFile

Create an instance: `$traffic_file = $client->TrafficFile();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `array` |  |
| `id` | `string` |  |
| `path` | `string` | Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip |
| `url` | `string` | Absolute download URL with security token (expires after 15 minutes) |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the TrafficFile record (throws on error).
$traffic_file = $client->TrafficFile()->load(["id" => "traffic_file_id"]);
```

#### Example: List

```php
// list() returns an array of TrafficFile records (throws on error).
$traffic_files = $client->TrafficFile()->list();
```


### Variable

Create an instance: `$variable = $client->Variable();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Variable description |
| `examples` | `array` | Example values |
| `formats` | `array` | Type-specific constraint formats (e.g. |
| `name` | `string` | Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+) |
| `ref` | `string` | Optional immutable identifier for the variable (used for merge identity) |
| `type` | `string` | Optional type descriptor for validation constraints |
| `variables` | `array` |  |

#### Example: List

```php
// list() returns an array of Variable records (throws on error).
$variables = $client->Variable()->list();
```

#### Example: Create

```php
$variable = $client->Variable()->create([
    "template_id" => null, // string
    "name" => null, // string
    "variables" => null, // array
]);
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── lmmultichannel_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`lmmultichannel_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$message = $client->Message();
$message->load(["id" => "example_id"]);

// $message->data_get() now returns the message data from the last load
// $message->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
