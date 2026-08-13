# LmMultichannel Golang SDK Reference

Complete API reference for the LmMultichannel Golang SDK.


## LmMultichannelSDK

### Constructor

```go
func NewLmMultichannelSDK(options map[string]any) *LmMultichannelSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *LmMultichannelSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *LmMultichannelSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Content(data map[string]any) LmMultichannelEntity`

Create a new `Content` entity instance. Pass `nil` for no initial data.

#### `Message(data map[string]any) LmMultichannelEntity`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `MessageEvent(data map[string]any) LmMultichannelEntity`

Create a new `MessageEvent` entity instance. Pass `nil` for no initial data.

#### `Option(data map[string]any) LmMultichannelEntity`

Create a new `Option` entity instance. Pass `nil` for no initial data.

#### `Schedule(data map[string]any) LmMultichannelEntity`

Create a new `Schedule` entity instance. Pass `nil` for no initial data.

#### `Self(data map[string]any) LmMultichannelEntity`

Create a new `Self` entity instance. Pass `nil` for no initial data.

#### `SelfAdmin(data map[string]any) LmMultichannelEntity`

Create a new `SelfAdmin` entity instance. Pass `nil` for no initial data.

#### `Template(data map[string]any) LmMultichannelEntity`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `Traffic(data map[string]any) LmMultichannelEntity`

Create a new `Traffic` entity instance. Pass `nil` for no initial data.

#### `TrafficFile(data map[string]any) LmMultichannelEntity`

Create a new `TrafficFile` entity instance. Pass `nil` for no initial data.

#### `Variable(data map[string]any) LmMultichannelEntity`

Create a new `Variable` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ContentEntity

```go
content := client.Content(nil)
fmt.Println(content.GetName()) // "content"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `map[string]any` | No |  |
| `carousel` | `map[string]any` | Yes |  |
| `content` | `map[string]any` | Yes |  |
| `fromTemplate` | `map[string]any` | Yes |  |
| `location` | `map[string]any` | Yes |  |
| `media` | `map[string]any` | Yes |  |
| `suggestions` | `[]any` | No |  |
| `text` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Content(nil).Load(map[string]any{"template_id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Content(nil).Create(map[string]any{
    "template_id": "example_template_id",
    "carousel": map[string]any{},
    "content": map[string]any{},
    "fromTemplate": map[string]any{},
    "location": map[string]any{},
    "media": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ContentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MessageEntity

```go
message := client.Message(nil)
fmt.Println(message.GetName()) // "message"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaignId` | `string` | No |  |
| `messages` | `[]any` | Yes |  |
| `scheduleAt` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Message(nil).Load(map[string]any{"id": "message_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Message(nil).Create(map[string]any{
    "messages": []any{},
    "scheduleAt": "example_scheduleAt",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Message(nil).Remove(map[string]any{"id": "message_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MessageEventEntity

```go
messageEvent := client.MessageEvent(nil)
fmt.Println(messageEvent.GetName()) // "message_event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `string` | Yes |  |
| `eventId` | `string` | Yes |  |
| `messageStatusChanged` | `map[string]any` | Yes |  |
| `on` | `string` | Yes |  |
| `templateReviewStatusChanged` | `map[string]any` | Yes |  |
| `userMessageReceived` | `map[string]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.MessageEvent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MessageEventEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OptionEntity

```go
option := client.Option(nil)
fmt.Println(option.GetName()) // "option"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | `map[string]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Option(nil).Load(map[string]any{"template_id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Option(nil).Create(map[string]any{
    "template_id": "example_template_id",
    "options": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Option(nil).Update(map[string]any{
    "template_id": "template_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OptionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ScheduleEntity

```go
schedule := client.Schedule(nil)
fmt.Println(schedule.GetName()) // "schedule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Schedule(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Schedule(nil).Remove(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScheduleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SelfEntity

```go
self := client.Self(nil)
fmt.Println(self.GetName()) // "self"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `string` | Yes |  |
| `settings` | `map[string]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Self(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SelfEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SelfAdminEntity

```go
selfAdmin := client.SelfAdmin(nil)
fmt.Println(selfAdmin.GetName()) // "self_admin"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callback` | `map[string]any` | Yes |  |
| `settings` | `map[string]any` | Yes |  |

### Operations

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.SelfAdmin(nil).Update(map[string]any{
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SelfAdminEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TemplateEntity

```go
template := client.Template(nil)
fmt.Println(template.GetName()) // "template"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channelData` | `map[string]any` | No |  |
| `content` | `map[string]any` | No |  |
| `createdOn` | `string` | Yes |  |
| `designerUrl` | `string` | No |  |
| `details` | `string` | No |  |
| `meta` | `map[string]any` | No |  |
| `occurredOn` | `string` | Yes |  |
| `options` | `map[string]any` | No |  |
| `reviews` | `map[string]any` | No |  |
| `status` | `string` | Yes |  |
| `template` | `map[string]any` | Yes |  |
| `templateId` | `string` | Yes |  |
| `updatedOn` | `string` | No |  |
| `variables` | `[]any` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Template(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Template(nil).Load(map[string]any{"id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Template(nil).Create(map[string]any{
    "createdOn": "example_createdOn",
    "occurredOn": "example_occurredOn",
    "status": "example_status",
    "template": map[string]any{},
    "templateId": "example_templateId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Template(nil).Update(map[string]any{
    "id": "template_id",
    "channel_id": "channel_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Template(nil).Remove(map[string]any{"id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TrafficEntity

```go
traffic := client.Traffic(nil)
fmt.Println(traffic.GetName()) // "traffic"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Traffic(nil).Remove(map[string]any{"path": "path"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TrafficEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TrafficFileEntity

```go
trafficFile := client.TrafficFile(nil)
fmt.Println(trafficFile.GetName()) // "traffic_file"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `files` | `[]any` | Yes |  |
| `path` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.TrafficFile(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TrafficFile(nil).Load(map[string]any{"id": "traffic_file_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TrafficFileEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VariableEntity

```go
variable := client.Variable(nil)
fmt.Println(variable.GetName()) // "variable"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `examples` | `[]any` | No |  |
| `formats` | `[]any` | No |  |
| `name` | `string` | Yes |  |
| `ref` | `string` | No |  |
| `type` | `string` | No |  |
| `variables` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Variable(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Variable(nil).Create(map[string]any{
    "template_id": "example_template_id",
    "name": "example_name",
    "variables": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Variable(nil).Update(map[string]any{
    "template_id": "template_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VariableEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewLmMultichannelSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

