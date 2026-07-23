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
`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    content = client.Content().load({"template_id": "example_template_id"})
    print(content)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the bare created record (a dict)
created = client.Content().create({"template_id": "example_template_id"})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    content = client.Content().load({"template_id": "example"})
    print(content)
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

# Entity ops return the bare record and raise on error.
content = client.Content().load({"template_id": "example"})
# content contains the mock response record
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

Entity operations return the bare result data (a `dict` for single-entity
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

Create an instance: `content = client.Content()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `dict` |  |

#### Example: Load

```python
content = client.Content().load({"template_id": "template_id"})
```

#### Example: Create

```python
content = client.Content().create({
    "template_id": "example_template_id",  # str
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
| `message` | `list` |  |
| `schedule` | `dict` |  |

#### Example: Load

```python
message = client.Message().load({"id": "message_id"})
```

#### Example: Create

```python
message = client.Message().create({
    "message": [],  # list
    "schedule": {},  # dict
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
| `account_id` | `str` |  |
| `event_id` | `str` |  |
| `message_status_changed` | `dict` |  |
| `on` | `str` |  |
| `template_review_status_changed` | `dict` |  |
| `user_message_received` | `dict` |  |

#### Example: List

```python
message_events = client.MessageEvent().list()
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
| `option` | `dict` |  |

#### Example: Load

```python
option = client.Option().load({"template_id": "template_id"})
```

#### Example: Create

```python
option = client.Option().create({
    "template_id": "example_template_id",  # str
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
| `count` | `int` |  |

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
| `account` | `dict` |  |

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
| `setting` | `dict` |  |


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
| `channel_data` | `dict` |  |
| `created_on` | `str` |  |
| `designer_url` | `str` |  |
| `detail` | `str` |  |
| `meta` | `dict` |  |
| `occurred_on` | `str` |  |
| `review` | `dict` |  |
| `status` | `str` |  |
| `template` | `dict` |  |
| `template_id` | `str` |  |
| `updated_on` | `str` |  |

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
    "created_on": "example_created_on",  # str
    "meta": {},  # dict
    "occurred_on": "example_occurred_on",  # str
    "review": {},  # dict
    "status": "example_status",  # str
    "template": {},  # dict
    "template_id": "example_template_id",  # str
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
| `file` | `list` |  |
| `path` | `str` |  |
| `url` | `str` |  |

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
| `description` | `str` |  |
| `example` | `list` |  |
| `format` | `list` |  |
| `name` | `str` |  |
| `ref` | `str` |  |
| `type` | `str` |  |
| `variable` | `list` |  |

#### Example: List

```python
variables = client.Variable().list()
```

#### Example: Create

```python
variable = client.Variable().create({
    "template_id": "example_template_id",  # str
})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
content = client.Content()
content.load({"template_id": "example"})

# content.data_get() now returns the content data from the last load
# content.match_get() returns the last match criteria
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
