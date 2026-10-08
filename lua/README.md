# LmMultichannel Lua SDK

LINK Mobility MyLINK Multichannel API clients in TypeScript, Python, PHP, Go, Ruby and Lua, plus a CLI and an MCP server for AI agents. All generated from LINK Mobility's public OpenAPI definition, so every surface stays in sync with the API.

The Lua SDK for the LmMultichannel API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Content()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/lm-multichannel-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record. The client sends the API key in the `x-api-key` header.

### 1. Create a client

```lua
local sdk = require("lm-multichannel_sdk")

local client = sdk.new({
  apikey = os.getenv("LM_MULTICHANNEL_APIKEY"),
})
```

### 3. Load a content

Content is nested under template, so provide the `template_id`.

`load` returns the entity; `data_get()` reads its record.

```lua
local content, err = client:Content():load({ template_id = "example_template_id" })
if err then error(err) end
for k, val in pairs(content:data_get()) do print(k, val) end
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Content():create({ template_id = "example_template_id", carousel = {}, fromTemplate = {}, location = {}, media = {} })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local message, err = client:Message():load({ id = "example_id" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Message():load({ id = "test01" })
-- result is the entity; data_get() reads its mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LM_MULTICHANNEL_TEST_LIVE=TRUE
LM_MULTICHANNEL_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### LmMultichannelSDK

```lua
local sdk = require("lm-multichannel_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LmMultichannelSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Content` | `(data) -> ContentEntity` | Create a Content entity instance. |
| `Message` | `(data) -> MessageEntity` | Create a Message entity instance. |
| `MessageEvent` | `(data) -> MessageEventEntity` | Create a MessageEvent entity instance. |
| `Option` | `(data) -> OptionEntity` | Create an Option entity instance. |
| `Schedule` | `(data) -> ScheduleEntity` | Create a Schedule entity instance. |
| `Self` | `(data) -> SelfEntity` | Create a Self entity instance. |
| `SelfAdmin` | `(data) -> SelfAdminEntity` | Create a SelfAdmin entity instance. |
| `Template` | `(data) -> TemplateEntity` | Create a Template entity instance. |
| `TemplateReviewEvent` | `(data) -> TemplateReviewEventEntity` | Create a TemplateReviewEvent entity instance. |
| `Traffic` | `(data) -> TrafficEntity` | Create a Traffic entity instance. |
| `TrafficFile` | `(data) -> TrafficFileEntity` | Create a TrafficFile entity instance. |
| `Variable` | `(data) -> VariableEntity` | Create a Variable entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity, and return it. |
| `patch` | `(reqdata, ctrl) -> any, err` | Change part of an existing entity, and return it. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity, and return it marked as deleted. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `patch` / `remove` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local content, err = client:Content():load()
    if err then error(err) end
    -- content is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Content

| Field | Description |
| --- | --- |
| `card` | Rich card containing media, text and/or buttons |
| `carousel` |  |
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
| `id` |  |
| `messages` |  |
| `requestId` | Unique request identifier |

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
| `status` | Template review lifecycle status. |
| `templateId` | Unique template identifier (generated by the service) |
| `updatedOn` | Date of last template update |
| `variables` |  |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/templates/{templateId}/meta`

#### TemplateReviewEvent

| Field | Description |
| --- | --- |
| `accountId` | Account identifier |
| `eventId` | Unique event identifier (for idempotent processing / deduplication) |
| `messageStatusChanged` |  |
| `on` | UTC date-time when the event occurred |
| `templateReviewStatusChanged` |  |
| `userMessageReceived` |  |

Operations: List.

API path: `/templates/{templateId}/reviews/{channelId}/events`

#### Traffic

| Field | Description |
| --- | --- |
| `path` | Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip |
| `url` | Absolute download URL with security token (expires after 15 minutes) |

Operations: List, Remove.

API path: `/traffic/files`

#### TrafficFile

| Field | Description |
| --- | --- |
| `files` |  |
| `id` |  |

Operations: Load.

API path: `/traffic/files/{path}`

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

Create an instance: `local content = client:Content(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `table` | Rich card containing media, text and/or buttons |
| `carousel` | `table` |  |
| `fromTemplate` | `table` | Content generated from a pre-defined template |
| `location` | `table` |  |
| `media` | `table` |  |
| `suggestions` | `table` | Quick replies / suggestion buttons (not applicable to fromTemplate) |
| `text` | `string` | Simple text content |

#### Example: Load

```lua
local content, err = client:Content():load({ template_id = "template_id" })
```

#### Example: Create

```lua
local content, err = client:Content():create({
  template_id = "example_template_id", -- string
  carousel = {}, -- table
  fromTemplate = {}, -- table
  location = {}, -- table
  media = {}, -- table
})
```


### Message

Create an instance: `local message = client:Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `messages` | `table` |  |
| `requestId` | `string` | Unique request identifier |

#### Example: Load

```lua
local message, err = client:Message():load({ id = "message_id" })
```

#### Example: Create

```lua
local message, err = client:Message():create({
  messages = {}, -- table
  requestId = "example_requestId", -- string
})
```


### MessageEvent

Create an instance: `local message_event = client:MessageEvent(nil)`

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
| `messageStatusChanged` | `table` |  |
| `on` | `string` | UTC date-time when the event occurred |
| `templateReviewStatusChanged` | `table` |  |
| `userMessageReceived` | `table` |  |

#### Example: List

```lua
local message_events, err = client:MessageEvent():list({ id = "example" })
```


### Option

Create an instance: `local option = client:Option(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `options` | `table` |  |

#### Example: Load

```lua
local option, err = client:Option():load({ template_id = "template_id" })
```

#### Example: Create

```lua
local option, err = client:Option():create({
  template_id = "example_template_id", -- string
  options = {}, -- table
})
```


### Schedule

Create an instance: `local schedule = client:Schedule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Example: Load

```lua
local schedule, err = client:Schedule():load()
```


### Self

Create an instance: `local self = client:Self(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `string` | Unique technical account identifier |
| `settings` | `table` |  |

#### Example: Load

```lua
local self, err = client:Self():load()
```


### SelfAdmin

Create an instance: `local self_admin = client:SelfAdmin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `callback` | `table` |  |
| `settings` | `table` |  |


### Template

Create an instance: `local template = client:Template(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channelData` | `table` |  |
| `content` | `table` | Message content. |
| `createdOn` | `string` | Date of template creation |
| `designerUrl` | `string` | URL to the external template designer (dynamically generated if enabled) |
| `details` | `string` | Additional details about the latest status |
| `id` | `string` |  |
| `meta` | `table` |  |
| `occurredOn` | `string` | Date and time of last review status change |
| `options` | `table` |  |
| `reviews` | `table` | Channel-specific template reviews (keyed by channelId) |
| `status` | `string` | Template review lifecycle status. |
| `templateId` | `string` | Unique template identifier (generated by the service) |
| `updatedOn` | `string` | Date of last template update |
| `variables` | `table` |  |

#### Example: Load

```lua
local template, err = client:Template():load({ id = "template_id" })
```

#### Example: List

```lua
local templates, err = client:Template():list()
```

#### Example: Create

```lua
local template, err = client:Template():create({
  createdOn = "example_createdOn", -- string
  occurredOn = "example_occurredOn", -- string
  status = "example_status", -- string
  templateId = "example_templateId", -- string
})
```


### TemplateReviewEvent

Create an instance: `local template_review_event = client:TemplateReviewEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `string` | Account identifier |
| `eventId` | `string` | Unique event identifier (for idempotent processing / deduplication) |
| `messageStatusChanged` | `table` |  |
| `on` | `string` | UTC date-time when the event occurred |
| `templateReviewStatusChanged` | `table` |  |
| `userMessageReceived` | `table` |  |

#### Example: List

```lua
local template_review_events, err = client:TemplateReviewEvent():list({ review_id = "example", template_id = "example" })
```


### Traffic

Create an instance: `local traffic = client:Traffic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `path` | `string` | Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip |
| `url` | `string` | Absolute download URL with security token (expires after 15 minutes) |

#### Example: List

```lua
local traffics, err = client:Traffic():list()
```


### TrafficFile

Create an instance: `local traffic_file = client:TrafficFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `table` |  |
| `id` | `string` |  |

#### Example: Load

```lua
local traffic_file, err = client:TrafficFile():load({ id = "traffic_file_id" })
```


### Variable

Create an instance: `local variable = client:Variable(nil)`

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
| `examples` | `table` | Example values |
| `formats` | `table` | Type-specific constraint formats (e.g. |
| `name` | `string` | Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+) |
| `ref` | `string` | Optional immutable identifier for the variable (used for merge identity) |
| `type` | `string` | Optional type descriptor for validation constraints |
| `variables` | `table` |  |

#### Example: List

```lua
local variables, err = client:Variable():list({ template_id = "example" })
```

#### Example: Create

```lua
local variable, err = client:Variable():create({
  template_id = "example_template_id", -- string
  name = "example_name", -- string
  variables = {}, -- table
})
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

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

Rate limiting.

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

Retry.

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

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── lm-multichannel_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`lm-multichannel_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local message = client:Message()
message:load({ id = "example_id" })

-- message:data_get() now returns the message data from the last load
-- message:match_get() returns the last match criteria
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
