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
    // load() returns the bare Content record (throws on error).
    $content = $client->Content()->load(["template_id" => "example_template_id"]);
    print_r($content);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the bare created Content record.
$created = $client->Content()->create(["template_id" => "example_template_id"]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $content = $client->Content()->load(["template_id" => "example"]);
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

Create a mock client for unit testing — no server required:

```php
$client = LmMultichannelSDK::test();

// Entity ops return the bare mock record (throws on error).
$content = $client->Content()->load(["template_id" => "example"]);
print_r($content);
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

Entity operations return the bare result data (an `array` for single-entity
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
| `content` |  |

Operations: Create, Load.

API path: `/templates/{templateId}/content`

#### Message

| Field | Description |
| --- | --- |
| `message` |  |
| `schedule` |  |

Operations: Create, Load, Remove.

API path: `/messages`

#### MessageEvent

| Field | Description |
| --- | --- |
| `account_id` |  |
| `event_id` |  |
| `message_status_changed` |  |
| `on` |  |
| `template_review_status_changed` |  |
| `user_message_received` |  |

Operations: List.

API path: `/messages/{messageId}/events`

#### Option

| Field | Description |
| --- | --- |
| `option` |  |

Operations: Create, Load, Update.

API path: `/templates/{templateId}/options`

#### Schedule

| Field | Description |
| --- | --- |
| `count` |  |

Operations: Load, Remove.

API path: `/schedules:count`

#### Self

| Field | Description |
| --- | --- |
| `account` |  |

Operations: Load.

API path: `/self`

#### SelfAdmin

| Field | Description |
| --- | --- |
| `setting` |  |

Operations: Update.

API path: `/self/settings`

#### Template

| Field | Description |
| --- | --- |
| `channel_data` |  |
| `created_on` |  |
| `designer_url` |  |
| `detail` |  |
| `meta` |  |
| `occurred_on` |  |
| `review` |  |
| `status` |  |
| `template` |  |
| `template_id` |  |
| `updated_on` |  |

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
| `file` |  |
| `path` |  |
| `url` |  |

Operations: List, Load.

API path: `/traffic/files`

#### Variable

| Field | Description |
| --- | --- |
| `description` |  |
| `example` |  |
| `format` |  |
| `name` |  |
| `ref` |  |
| `type` |  |
| `variable` |  |

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
| `content` | `array` |  |

#### Example: Load

```php
// load() returns the bare Content record (throws on error).
$content = $client->Content()->load(["template_id" => "template_id"]);
```

#### Example: Create

```php
$content = $client->Content()->create([
    "template_id" => null, // string
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
| `message` | `array` |  |
| `schedule` | `array` |  |

#### Example: Load

```php
// load() returns the bare Message record (throws on error).
$message = $client->Message()->load(["id" => "message_id"]);
```

#### Example: Create

```php
$message = $client->Message()->create([
    "message" => null, // array
    "schedule" => null, // array
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
| `account_id` | `string` |  |
| `event_id` | `string` |  |
| `message_status_changed` | `array` |  |
| `on` | `string` |  |
| `template_review_status_changed` | `array` |  |
| `user_message_received` | `array` |  |

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
| `option` | `array` |  |

#### Example: Load

```php
// load() returns the bare Option record (throws on error).
$option = $client->Option()->load(["template_id" => "template_id"]);
```

#### Example: Create

```php
$option = $client->Option()->create([
    "template_id" => null, // string
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
| `count` | `int` |  |

#### Example: Load

```php
// load() returns the bare Schedule record (throws on error).
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
| `account` | `array` |  |

#### Example: Load

```php
// load() returns the bare Self record (throws on error).
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
| `setting` | `array` |  |


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
| `channel_data` | `array` |  |
| `created_on` | `string` |  |
| `designer_url` | `string` |  |
| `detail` | `string` |  |
| `meta` | `array` |  |
| `occurred_on` | `string` |  |
| `review` | `array` |  |
| `status` | `string` |  |
| `template` | `array` |  |
| `template_id` | `string` |  |
| `updated_on` | `string` |  |

#### Example: Load

```php
// load() returns the bare Template record (throws on error).
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
    "created_on" => null, // string
    "meta" => null, // array
    "occurred_on" => null, // string
    "review" => null, // array
    "status" => null, // string
    "template" => null, // array
    "template_id" => null, // string
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
| `file` | `array` |  |
| `path` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare TrafficFile record (throws on error).
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
| `description` | `string` |  |
| `example` | `array` |  |
| `format` | `array` |  |
| `name` | `string` |  |
| `ref` | `string` |  |
| `type` | `string` |  |
| `variable` | `array` |  |

#### Example: List

```php
// list() returns an array of Variable records (throws on error).
$variables = $client->Variable()->list();
```

#### Example: Create

```php
$variable = $client->Variable()->create([
    "template_id" => null, // string
]);
```


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

- **TestFeature**: In-memory mock transport for testing without a live server

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
$content = $client->Content();
$content->load(["template_id" => "example"]);

// $content->data_get() now returns the content data from the last load
// $content->match_get() returns the last match criteria
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
