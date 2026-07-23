# LmMultichannel Ruby SDK



The Ruby SDK for the LmMultichannel API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Content` — with named operations (`list`/`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/lm-multichannel-sdk/releases](https://github.com/voxgig-sdk/lm-multichannel-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "LmMultichannel_sdk"

client = LmMultichannelSDK.new({
  "apikey" => ENV["LM_MULTICHANNEL_APIKEY"],
})
```

### 3. Load a content

Content is nested under template, so provide the `template_id`.

```ruby
begin
  # load returns the bare Content record (raises on error).
  content = client.Content.load({ "template_id" => "example_template_id" })
  puts content
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the bare created Content record.
created = client.Content.create({ "template_id" => "example_template_id" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  content = client.Content.load({ "template_id" => "example" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = LmMultichannelSDK.test

# Entity ops return the bare mock record (raises on error).
content = client.Content.load({ "template_id" => "example" })
puts content
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = LmMultichannelSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### LmMultichannelSDK

```ruby
require_relative "LmMultichannel_sdk"
client = LmMultichannelSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = LmMultichannelSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LmMultichannelSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `LmMultichannelError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `content = client.Content`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `Hash` |  |

#### Example: Load

```ruby
# load returns the bare Content record (raises on error).
content = client.Content.load({ "template_id" => "template_id" })
```

#### Example: Create

```ruby
content = client.Content.create({
  "template_id" => "example_template_id", # String
})
```


### Message

Create an instance: `message = client.Message`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `message` | `Array` |  |
| `schedule` | `Hash` |  |

#### Example: Load

```ruby
# load returns the bare Message record (raises on error).
message = client.Message.load({ "id" => "message_id" })
```

#### Example: Create

```ruby
message = client.Message.create({
  "message" => [], # Array
  "schedule" => {}, # Hash
})
```


### MessageEvent

Create an instance: `message_event = client.MessageEvent`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `String` |  |
| `event_id` | `String` |  |
| `message_status_changed` | `Hash` |  |
| `on` | `String` |  |
| `template_review_status_changed` | `Hash` |  |
| `user_message_received` | `Hash` |  |

#### Example: List

```ruby
# list returns an Array of MessageEvent records (raises on error).
message_events = client.MessageEvent.list
```


### Option

Create an instance: `option = client.Option`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `option` | `Hash` |  |

#### Example: Load

```ruby
# load returns the bare Option record (raises on error).
option = client.Option.load({ "template_id" => "template_id" })
```

#### Example: Create

```ruby
option = client.Option.create({
  "template_id" => "example_template_id", # String
})
```


### Schedule

Create an instance: `schedule = client.Schedule`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Schedule record (raises on error).
schedule = client.Schedule.load()
```


### Self

Create an instance: `self_ = client.Self`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account` | `Hash` |  |

#### Example: Load

```ruby
# load returns the bare Self record (raises on error).
self_ = client.Self.load()
```


### SelfAdmin

Create an instance: `self_admin = client.SelfAdmin`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `setting` | `Hash` |  |


### Template

Create an instance: `template = client.Template`

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
| `channel_data` | `Hash` |  |
| `created_on` | `String` |  |
| `designer_url` | `String` |  |
| `detail` | `String` |  |
| `meta` | `Hash` |  |
| `occurred_on` | `String` |  |
| `review` | `Hash` |  |
| `status` | `String` |  |
| `template` | `Hash` |  |
| `template_id` | `String` |  |
| `updated_on` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Template record (raises on error).
template = client.Template.load({ "id" => "template_id" })
```

#### Example: List

```ruby
# list returns an Array of Template records (raises on error).
templates = client.Template.list
```

#### Example: Create

```ruby
template = client.Template.create({
  "created_on" => "example_created_on", # String
  "meta" => {}, # Hash
  "occurred_on" => "example_occurred_on", # String
  "review" => {}, # Hash
  "status" => "example_status", # String
  "template" => {}, # Hash
  "template_id" => "example_template_id", # String
})
```


### Traffic

Create an instance: `traffic = client.Traffic`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### TrafficFile

Create an instance: `traffic_file = client.TrafficFile`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `file` | `Array` |  |
| `path` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare TrafficFile record (raises on error).
traffic_file = client.TrafficFile.load({ "id" => "traffic_file_id" })
```

#### Example: List

```ruby
# list returns an Array of TrafficFile records (raises on error).
traffic_files = client.TrafficFile.list
```


### Variable

Create an instance: `variable = client.Variable`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `example` | `Array` |  |
| `format` | `Array` |  |
| `name` | `String` |  |
| `ref` | `String` |  |
| `type` | `String` |  |
| `variable` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Variable records (raises on error).
variables = client.Variable.list
```

#### Example: Create

```ruby
variable = client.Variable.create({
  "template_id" => "example_template_id", # String
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── LmMultichannel_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`LmMultichannel_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
content = client.Content
content.load({ "template_id" => "example" })

# content.data_get now returns the content data from the last load
# content.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
