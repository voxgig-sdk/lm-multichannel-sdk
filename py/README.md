# LmMultichannel Python SDK



The Python SDK for the LmMultichannel API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Content()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/lm-multichannel-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from lmmultichannel_sdk import LmMultichannelSDK

client = LmMultichannelSDK({
    "apikey": os.environ.get("LM_MULTICHANNEL_APIKEY"),
})
```

### 3. Load a content

Content is nested under template, so provide the `template_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    content = client.Content().load({"template_id": "example_template_id"})
    print(content)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Content().create({"template_id": "example_template_id", "carousel": {}, "content": {}, "fromTemplate": {}, "location": {}, "media": {}})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    message = client.Message().load({"id": "example_id"})
    print(message)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = LmMultichannelSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
message = client.Message().load({"id": "test01"})
# message contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = LmMultichannelSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### LmMultichannelSDK

```python
from lmmultichannel_sdk import LmMultichannelSDK

client = LmMultichannelSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = LmMultichannelSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### LmMultichannelSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Content` | `(data) -> ContentEntity` | Create a Content entity instance. |
| `Message` | `(data) -> MessageEntity` | Create a Message entity instance. |
| `MessageEvent` | `(data) -> MessageEventEntity` | Create a MessageEvent entity instance. |
| `Option` | `(data) -> OptionEntity` | Create an Option entity instance. |
| `Schedule` | `(data) -> ScheduleEntity` | Create a Schedule entity instance. |
| `Self` | `(data) -> SelfEntity` | Create a Self entity instance. |
| `SelfAdmin` | `(data) -> SelfAdminEntity` | Create a SelfAdmin entity instance. |
| `Template` | `(data) -> TemplateEntity` | Create a Template entity instance. |
| `Traffic` | `(data) -> TrafficEntity` | Create a Traffic entity instance. |
| `TrafficFile` | `(data) -> TrafficFileEntity` | Create a TrafficFile entity instance. |
| `Variable` | `(data) -> VariableEntity` | Create a Variable entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `content = client.Content()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `dict` | Rich card containing media, text and/or buttons |
| `carousel` | `dict` |  |
| `content` | `dict` | Message content. |
| `fromTemplate` | `dict` | Content generated from a pre-defined template |
| `location` | `dict` |  |
| `media` | `dict` |  |
| `suggestions` | `list` | Quick replies / suggestion buttons (not applicable to fromTemplate) |
| `text` | `str` | Simple text content |

#### Example: Load

```python
content = client.Content().load({"template_id": "template_id"})
```

#### Example: Create

```python
content = client.Content().create({
    "template_id": "example_template_id",  # str
    "carousel": {},  # dict
    "content": {},  # dict
    "fromTemplate": {},  # dict
    "location": {},  # dict
    "media": {},  # dict
})
```


### Message

Create an instance: `message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaignId` | `str` | Schedule grouping identifier |
| `id` | `str` |  |
| `messages` | `list` |  |
| `scheduleAt` | `str` | Scheduled sending time |

#### Example: Load

```python
message = client.Message().load({"id": "message_id"})
```

#### Example: Create

```python
message = client.Message().create({
    "messages": [],  # list
    "scheduleAt": "example_scheduleAt",  # str
})
```


### MessageEvent

Create an instance: `message_event = client.MessageEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `str` | Account identifier |
| `eventId` | `str` | Unique event identifier (for idempotent processing / deduplication) |
| `id` | `str` |  |
| `messageStatusChanged` | `dict` |  |
| `on` | `str` | UTC date-time when the event occurred |
| `templateReviewStatusChanged` | `dict` |  |
| `userMessageReceived` | `dict` |  |

#### Example: List

```python
message_events = client.MessageEvent().list({"id": "example"})
```


### Option

Create an instance: `option = client.Option()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `options` | `dict` |  |

#### Example: Load

```python
option = client.Option().load({"template_id": "template_id"})
```

#### Example: Create

```python
option = client.Option().create({
    "template_id": "example_template_id",  # str
    "options": {},  # dict
})
```


### Schedule

Create an instance: `schedule = client.Schedule()`

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

```python
schedule = client.Schedule().load()
```


### Self

Create an instance: `self = client.Self()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `str` | Unique technical account identifier |
| `settings` | `dict` |  |

#### Example: Load

```python
self = client.Self().load()
```


### SelfAdmin

Create an instance: `self_admin = client.SelfAdmin()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `callback` | `dict` |  |
| `settings` | `dict` |  |


### Template

Create an instance: `template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channelData` | `dict` |  |
| `content` | `dict` | Message content. |
| `createdOn` | `str` | Date of template creation |
| `designerUrl` | `str` | URL to the external template designer (dynamically generated if enabled) |
| `details` | `str` | Additional details about the latest status |
| `id` | `str` |  |
| `meta` | `dict` |  |
| `occurredOn` | `str` | Date and time of last review status change |
| `options` | `dict` |  |
| `reviews` | `dict` | Channel-specific template reviews (keyed by channelId) |
| `status` | `str` | Template review lifecycle status |
| `template` | `dict` | Properties for creating a new template |
| `templateId` | `str` | Unique template identifier (generated by the service) |
| `updatedOn` | `str` | Date of last template update |
| `variables` | `list` |  |

#### Example: Load

```python
template = client.Template().load({"id": "template_id"})
```

#### Example: List

```python
templates = client.Template().list()
```

#### Example: Create

```python
template = client.Template().create({
    "createdOn": "example_createdOn",  # str
    "occurredOn": "example_occurredOn",  # str
    "status": "example_status",  # str
    "template": {},  # dict
    "templateId": "example_templateId",  # str
})
```


### Traffic

Create an instance: `traffic = client.Traffic()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### TrafficFile

Create an instance: `traffic_file = client.TrafficFile()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `list` |  |
| `id` | `str` |  |
| `path` | `str` | Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip |
| `url` | `str` | Absolute download URL with security token (expires after 15 minutes) |

#### Example: Load

```python
traffic_file = client.TrafficFile().load({"id": "traffic_file_id"})
```

#### Example: List

```python
traffic_files = client.TrafficFile().list()
```


### Variable

Create an instance: `variable = client.Variable()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Variable description |
| `examples` | `list` | Example values |
| `formats` | `list` | Type-specific constraint formats (e.g. |
| `name` | `str` | Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+) |
| `ref` | `str` | Optional immutable identifier for the variable (used for merge identity) |
| `type` | `str` | Optional type descriptor for validation constraints |
| `variables` | `list` |  |

#### Example: List

```python
variables = client.Variable().list({"template_id": "example"})
```

#### Example: Create

```python
variable = client.Variable().create({
    "template_id": "example_template_id",  # str
    "name": "example_name",  # str
    "variables": [],  # list
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── lmmultichannel_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`lmmultichannel_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
message = client.Message()
message.load({"id": "example_id"})

# message.data_get() now returns the message data from the last load
# message.match_get() returns the last match criteria
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
