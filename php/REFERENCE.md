# LmMultichannel PHP SDK Reference

Complete API reference for the LmMultichannel PHP SDK.


## LmMultichannelSDK

### Constructor

```php
require_once __DIR__ . '/lmmultichannel_sdk.php';

$client = new LmMultichannelSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmMultichannelSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = LmMultichannelSDK::test();
```


### Instance Methods

#### `Content($data = null)`

Create a new `ContentEntity` instance. Pass `null` for no initial data.

#### `Message($data = null)`

Create a new `MessageEntity` instance. Pass `null` for no initial data.

#### `MessageEvent($data = null)`

Create a new `MessageEventEntity` instance. Pass `null` for no initial data.

#### `Option($data = null)`

Create a new `OptionEntity` instance. Pass `null` for no initial data.

#### `Schedule($data = null)`

Create a new `ScheduleEntity` instance. Pass `null` for no initial data.

#### `Self($data = null)`

Create a new `SelfEntity` instance. Pass `null` for no initial data.

#### `SelfAdmin($data = null)`

Create a new `SelfAdminEntity` instance. Pass `null` for no initial data.

#### `Template($data = null)`

Create a new `TemplateEntity` instance. Pass `null` for no initial data.

#### `Traffic($data = null)`

Create a new `TrafficEntity` instance. Pass `null` for no initial data.

#### `TrafficFile($data = null)`

Create a new `TrafficFileEntity` instance. Pass `null` for no initial data.

#### `Variable($data = null)`

Create a new `VariableEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): LmMultichannelUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ContentEntity

```php
$content = $client->Content();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `array` | No |  |
| `carousel` | `array` | Yes |  |
| `content` | `array` | Yes |  |
| `fromTemplate` | `array` | Yes |  |
| `location` | `array` | Yes |  |
| `media` | `array` | Yes |  |
| `suggestions` | `array` | No |  |
| `text` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Content()->create([
  "template_id" => null, // string
  "carousel" => null, // array
  "content" => null, // array
  "fromTemplate" => null, // array
  "location" => null, // array
  "media" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Content()->load(["template_id" => "template_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ContentEntity`

Create a new `ContentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MessageEntity

```php
$message = $client->Message();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaignId` | `string` | No |  |
| `messages` | `array` | Yes |  |
| `scheduleAt` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Message()->create([
  "messages" => null, // array
  "scheduleAt" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Message()->load(["id" => "message_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Message()->remove(["id" => "message_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MessageEntity`

Create a new `MessageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MessageEventEntity

```php
$message_event = $client->MessageEvent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `string` | Yes |  |
| `eventId` | `string` | Yes |  |
| `messageStatusChanged` | `array` | Yes |  |
| `on` | `string` | Yes |  |
| `templateReviewStatusChanged` | `array` | Yes |  |
| `userMessageReceived` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->MessageEvent()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MessageEventEntity`

Create a new `MessageEventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OptionEntity

```php
$option = $client->Option();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Option()->create([
  "template_id" => null, // string
  "options" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Option()->load(["template_id" => "template_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Option()->update([
  "template_id" => "template_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OptionEntity`

Create a new `OptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScheduleEntity

```php
$schedule = $client->Schedule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Schedule()->load();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Schedule()->remove();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScheduleEntity`

Create a new `ScheduleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SelfEntity

```php
$self = $client->Self();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `string` | Yes |  |
| `settings` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Self()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SelfEntity`

Create a new `SelfEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SelfAdminEntity

```php
$self_admin = $client->SelfAdmin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callback` | `array` | Yes |  |
| `settings` | `array` | Yes |  |

### Operations

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->SelfAdmin()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SelfAdminEntity`

Create a new `SelfAdminEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TemplateEntity

```php
$template = $client->Template();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channelData` | `array` | No |  |
| `content` | `array` | No |  |
| `createdOn` | `string` | Yes |  |
| `designerUrl` | `string` | No |  |
| `details` | `string` | No |  |
| `meta` | `array` | No |  |
| `occurredOn` | `string` | Yes |  |
| `options` | `array` | No |  |
| `reviews` | `array` | No |  |
| `status` | `string` | Yes |  |
| `template` | `array` | Yes |  |
| `templateId` | `string` | Yes |  |
| `updatedOn` | `string` | No |  |
| `variables` | `array` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `channelData` | - | - | - | - | - |
| `content` | - | - | - | - | - |
| `createdOn` | - | - | - | - | - |
| `designerUrl` | - | - | - | - | - |
| `details` | - | - | - | - | - |
| `meta` | - | - | Yes | - | - |
| `occurredOn` | - | - | - | - | - |
| `options` | - | - | - | - | - |
| `reviews` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `template` | - | - | - | - | - |
| `templateId` | - | - | - | - | - |
| `updatedOn` | - | - | - | - | - |
| `variables` | - | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Template()->create([
  "createdOn" => null, // string
  "occurredOn" => null, // string
  "status" => null, // string
  "template" => null, // array
  "templateId" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Template()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Template()->load(["id" => "template_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Template()->remove(["id" => "template_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Template()->update([
  "id" => "template_id",
  "channel_id" => "channel_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TemplateEntity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TrafficEntity

```php
$traffic = $client->Traffic();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Traffic()->remove(["path" => "path"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TrafficEntity`

Create a new `TrafficEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TrafficFileEntity

```php
$traffic_file = $client->TrafficFile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `files` | `array` | Yes |  |
| `path` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->TrafficFile()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->TrafficFile()->load(["id" => "traffic_file_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TrafficFileEntity`

Create a new `TrafficFileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VariableEntity

```php
$variable = $client->Variable();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `examples` | `array` | No |  |
| `formats` | `array` | No |  |
| `name` | `string` | Yes |  |
| `ref` | `string` | No |  |
| `type` | `string` | No |  |
| `variables` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Variable()->create([
  "template_id" => null, // string
  "name" => null, // string
  "variables" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Variable()->list();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Variable()->update([
  "template_id" => "template_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VariableEntity`

Create a new `VariableEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new LmMultichannelSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

