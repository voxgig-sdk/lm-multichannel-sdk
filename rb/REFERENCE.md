# LmMultichannel Ruby SDK Reference

Complete API reference for the LmMultichannel Ruby SDK.


## LmMultichannelSDK

### Constructor

```ruby
require_relative 'LmMultichannel_sdk'

client = LmMultichannelSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmMultichannelSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = LmMultichannelSDK.test
```


### Instance Methods

#### `Content(data = nil)`

Create a new `Content` entity instance. Pass `nil` for no initial data.

#### `Message(data = nil)`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `MessageEvent(data = nil)`

Create a new `MessageEvent` entity instance. Pass `nil` for no initial data.

#### `Option(data = nil)`

Create a new `Option` entity instance. Pass `nil` for no initial data.

#### `Schedule(data = nil)`

Create a new `Schedule` entity instance. Pass `nil` for no initial data.

#### `Self(data = nil)`

Create a new `Self` entity instance. Pass `nil` for no initial data.

#### `SelfAdmin(data = nil)`

Create a new `SelfAdmin` entity instance. Pass `nil` for no initial data.

#### `Template(data = nil)`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `Traffic(data = nil)`

Create a new `Traffic` entity instance. Pass `nil` for no initial data.

#### `TrafficFile(data = nil)`

Create a new `TrafficFile` entity instance. Pass `nil` for no initial data.

#### `Variable(data = nil)`

Create a new `Variable` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ContentEntity

```ruby
content = client.Content
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `Hash` | No | Rich card containing media, text and/or buttons |
| `carousel` | `Hash` | Yes |  |
| `content` | `Hash` | Yes | Message content. |
| `fromTemplate` | `Hash` | Yes | Content generated from a pre-defined template |
| `location` | `Hash` | Yes |  |
| `media` | `Hash` | Yes |  |
| `suggestions` | `Array` | No | Quick replies / suggestion buttons (not applicable to fromTemplate) |
| `text` | `String` | No | Simple text content |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Content.create({
  "template_id" => "example_template_id", # String
  "carousel" => {}, # Hash
  "content" => {}, # Hash
  "fromTemplate" => {}, # Hash
  "location" => {}, # Hash
  "media" => {}, # Hash
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Content.load({ "template_id" => "template_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MessageEntity

```ruby
message = client.Message
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaignId` | `String` | No | Schedule grouping identifier |
| `messages` | `Array` | Yes |  |
| `scheduleAt` | `String` | Yes | Scheduled sending time |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Message.create({
  "messages" => [], # Array
  "scheduleAt" => "example_scheduleAt", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Message.load({ "id" => "message_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Message.remove({ "id" => "message_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MessageEventEntity

```ruby
message_event = client.MessageEvent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `String` | Yes | Account identifier |
| `eventId` | `String` | Yes | Unique event identifier (for idempotent processing / deduplication) |
| `messageStatusChanged` | `Hash` | Yes |  |
| `on` | `String` | Yes | UTC date-time when the event occurred |
| `templateReviewStatusChanged` | `Hash` | Yes |  |
| `userMessageReceived` | `Hash` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.MessageEvent.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MessageEventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OptionEntity

```ruby
option = client.Option
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | `Hash` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Option.create({
  "template_id" => "example_template_id", # String
  "options" => {}, # Hash
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Option.load({ "template_id" => "template_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Option.update({
  "template_id" => "template_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScheduleEntity

```ruby
schedule = client.Schedule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | Yes | Number of active schedules |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Schedule.load()
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Schedule.remove()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScheduleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SelfEntity

```ruby
self_ = client.Self
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `String` | Yes | Unique technical account identifier |
| `settings` | `Hash` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Self.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SelfEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SelfAdminEntity

```ruby
self_admin = client.SelfAdmin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callback` | `Hash` | Yes |  |
| `settings` | `Hash` | Yes |  |

### Operations

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.SelfAdmin.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SelfAdminEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TemplateEntity

```ruby
template = client.Template
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channelData` | `Hash` | No |  |
| `content` | `Hash` | No | Message content. |
| `createdOn` | `String` | Yes | Date of template creation |
| `designerUrl` | `String` | No | URL to the external template designer (dynamically generated if enabled) |
| `details` | `String` | No | Additional details about the latest status |
| `meta` | `Hash` | No |  |
| `occurredOn` | `String` | Yes | Date and time of last review status change |
| `options` | `Hash` | No |  |
| `reviews` | `Hash` | No | Channel-specific template reviews (keyed by channelId) |
| `status` | `String` | Yes | Template review lifecycle status |
| `template` | `Hash` | Yes | Properties for creating a new template |
| `templateId` | `String` | Yes | Unique template identifier (generated by the service) |
| `updatedOn` | `String` | No | Date of last template update |
| `variables` | `Array` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Template.create({
  "createdOn" => "example_createdOn", # String
  "occurredOn" => "example_occurredOn", # String
  "status" => "example_status", # String
  "template" => {}, # Hash
  "templateId" => "example_templateId", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Template.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Template.load({ "id" => "template_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Template.remove({ "id" => "template_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Template.update({
  "id" => "template_id",
  "channel_id" => "channel_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TrafficEntity

```ruby
traffic = client.Traffic
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Traffic.remove({ "path" => "path" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TrafficEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TrafficFileEntity

```ruby
traffic_file = client.TrafficFile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `files` | `Array` | Yes |  |
| `path` | `String` | Yes | Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip |
| `url` | `String` | Yes | Absolute download URL with security token (expires after 15 minutes) |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.TrafficFile.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TrafficFile.load({ "id" => "traffic_file_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TrafficFileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VariableEntity

```ruby
variable = client.Variable
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Variable description |
| `examples` | `Array` | No | Example values |
| `formats` | `Array` | No | Type-specific constraint formats (e.g. |
| `name` | `String` | Yes | Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+) |
| `ref` | `String` | No | Optional immutable identifier for the variable (used for merge identity) |
| `type` | `String` | No | Optional type descriptor for validation constraints |
| `variables` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Variable.create({
  "template_id" => "example_template_id", # String
  "name" => "example_name", # String
  "variables" => [], # Array
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Variable.list
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Variable.update({
  "template_id" => "template_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VariableEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = LmMultichannelSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

