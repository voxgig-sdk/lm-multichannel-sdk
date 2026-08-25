# LmMultichannel Golang SDK



The Golang SDK for the LmMultichannel API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Content(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`, `Patch`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/lm-multichannel-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/lm-multichannel-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/lm-multichannel-sdk/go=../lm-multichannel-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/lm-multichannel-sdk/go"
)

func main() {
    client := sdk.NewLmMultichannelSDK(map[string]any{
        "apikey": os.Getenv("LM_MULTICHANNEL_APIKEY"),
    })

    // Load a single content — the value is the loaded record.
    content, err := client.Content(nil).Load(map[string]any{"template_id": "example_template_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(content)

    // Create a content.
    created, err := client.Content(nil).Create(map[string]any{"template_id": "example_template_id", "carousel": map[string]any{}, "content": map[string]any{}, "fromTemplate": map[string]any{}, "location": map[string]any{}, "media": map[string]any{}}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
message, err := client.Message(nil).Load(map[string]any{"id": "example_id"}, nil)
if err != nil {
    // handle err
    return
}
_ = message
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

message, err := client.Message(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(message) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewLmMultichannelSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewLmMultichannelSDK

```go
func NewLmMultichannelSDK(options map[string]any) *LmMultichannelSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *LmMultichannelSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LmMultichannelSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Content` | `(data map[string]any) LmMultichannelEntity` | Create a Content entity instance. |
| `Message` | `(data map[string]any) LmMultichannelEntity` | Create a Message entity instance. |
| `MessageEvent` | `(data map[string]any) LmMultichannelEntity` | Create a MessageEvent entity instance. |
| `Option` | `(data map[string]any) LmMultichannelEntity` | Create an Option entity instance. |
| `Schedule` | `(data map[string]any) LmMultichannelEntity` | Create a Schedule entity instance. |
| `Self` | `(data map[string]any) LmMultichannelEntity` | Create a Self entity instance. |
| `SelfAdmin` | `(data map[string]any) LmMultichannelEntity` | Create a SelfAdmin entity instance. |
| `Template` | `(data map[string]any) LmMultichannelEntity` | Create a Template entity instance. |
| `Traffic` | `(data map[string]any) LmMultichannelEntity` | Create a Traffic entity instance. |
| `TrafficFile` | `(data map[string]any) LmMultichannelEntity` | Create a TrafficFile entity instance. |
| `Variable` | `(data map[string]any) LmMultichannelEntity` | Create a Variable entity instance. |

### Entity interface (LmMultichannelEntity)

All entities implement the `LmMultichannelEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    content, err := client.Content(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // content is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Content

| Field | Description |
| --- | --- |
| `"card"` | Rich card containing media, text and/or buttons |
| `"carousel"` |  |
| `"content"` | Message content. |
| `"fromTemplate"` | Content generated from a pre-defined template |
| `"location"` |  |
| `"media"` |  |
| `"suggestions"` | Quick replies / suggestion buttons (not applicable to fromTemplate) |
| `"text"` | Simple text content |

Operations: Create, Load.

API path: `/templates/{templateId}/content`

#### Message

| Field | Description |
| --- | --- |
| `"campaignId"` | Schedule grouping identifier |
| `"id"` |  |
| `"messages"` |  |
| `"scheduleAt"` | Scheduled sending time |

Operations: Create, Load, Remove.

API path: `/messages`

#### MessageEvent

| Field | Description |
| --- | --- |
| `"accountId"` | Account identifier |
| `"eventId"` | Unique event identifier (for idempotent processing / deduplication) |
| `"id"` |  |
| `"messageStatusChanged"` |  |
| `"on"` | UTC date-time when the event occurred |
| `"templateReviewStatusChanged"` |  |
| `"userMessageReceived"` |  |

Operations: List.

API path: `/messages/{messageId}/events`

#### Option

| Field | Description |
| --- | --- |
| `"options"` |  |

Operations: Create, Load, Update.

API path: `/templates/{templateId}/options`

#### Schedule

| Field | Description |
| --- | --- |
| `"count"` | Number of active schedules |

Operations: Load, Remove.

API path: `/schedules:count`

#### Self

| Field | Description |
| --- | --- |
| `"accountId"` | Unique technical account identifier |
| `"settings"` |  |

Operations: Load.

API path: `/self`

#### SelfAdmin

| Field | Description |
| --- | --- |
| `"callback"` |  |
| `"settings"` |  |

Operations: Update.

API path: `/self/settings`

#### Template

| Field | Description |
| --- | --- |
| `"channelData"` |  |
| `"content"` | Message content. |
| `"createdOn"` | Date of template creation |
| `"designerUrl"` | URL to the external template designer (dynamically generated if enabled) |
| `"details"` | Additional details about the latest status |
| `"id"` |  |
| `"meta"` |  |
| `"occurredOn"` | Date and time of last review status change |
| `"options"` |  |
| `"reviews"` | Channel-specific template reviews (keyed by channelId) |
| `"status"` | Template review lifecycle status |
| `"template"` | Properties for creating a new template |
| `"templateId"` | Unique template identifier (generated by the service) |
| `"updatedOn"` | Date of last template update |
| `"variables"` |  |

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
| `"files"` |  |
| `"id"` |  |
| `"path"` | Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip |
| `"url"` | Absolute download URL with security token (expires after 15 minutes) |

Operations: List, Load.

API path: `/traffic/files`

#### Variable

| Field | Description |
| --- | --- |
| `"description"` | Variable description |
| `"examples"` | Example values |
| `"formats"` | Type-specific constraint formats (e.g. |
| `"name"` | Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+) |
| `"ref"` | Optional immutable identifier for the variable (used for merge identity) |
| `"type"` | Optional type descriptor for validation constraints |
| `"variables"` |  |

Operations: Create, List, Update.

API path: `/templates/{templateId}/variables`



## Entities


### Content

Create an instance: `content := client.Content(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `card` | `map[string]any` | Rich card containing media, text and/or buttons |
| `carousel` | `map[string]any` |  |
| `content` | `map[string]any` | Message content. |
| `fromTemplate` | `map[string]any` | Content generated from a pre-defined template |
| `location` | `map[string]any` |  |
| `media` | `map[string]any` |  |
| `suggestions` | `[]any` | Quick replies / suggestion buttons (not applicable to fromTemplate) |
| `text` | `string` | Simple text content |

#### Example: Load

```go
content, err := client.Content(nil).Load(map[string]any{"template_id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(content) // the loaded record
```

#### Example: Create

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


### Message

Create an instance: `message := client.Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaignId` | `string` | Schedule grouping identifier |
| `id` | `string` |  |
| `messages` | `[]any` |  |
| `scheduleAt` | `string` | Scheduled sending time |

#### Example: Load

```go
message, err := client.Message(nil).Load(map[string]any{"id": "message_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(message) // the loaded record
```

#### Example: Create

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


### MessageEvent

Create an instance: `messageEvent := client.MessageEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `string` | Account identifier |
| `eventId` | `string` | Unique event identifier (for idempotent processing / deduplication) |
| `id` | `string` |  |
| `messageStatusChanged` | `map[string]any` |  |
| `on` | `string` | UTC date-time when the event occurred |
| `templateReviewStatusChanged` | `map[string]any` |  |
| `userMessageReceived` | `map[string]any` |  |

#### Example: List

```go
messageEvents, err := client.MessageEvent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(messageEvents) // the array of records
```


### Option

Create an instance: `option := client.Option(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` |  |

#### Example: Load

```go
option, err := client.Option(nil).Load(map[string]any{"template_id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(option) // the loaded record
```

#### Example: Create

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


### Schedule

Create an instance: `schedule := client.Schedule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of active schedules |

#### Example: Load

```go
schedule, err := client.Schedule(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(schedule) // the loaded record
```


### Self

Create an instance: `self := client.Self(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `string` | Unique technical account identifier |
| `settings` | `map[string]any` |  |

#### Example: Load

```go
self, err := client.Self(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(self) // the loaded record
```


### SelfAdmin

Create an instance: `selfAdmin := client.SelfAdmin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `callback` | `map[string]any` |  |
| `settings` | `map[string]any` |  |


### Template

Create an instance: `template := client.Template(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `channelData` | `map[string]any` |  |
| `content` | `map[string]any` | Message content. |
| `createdOn` | `string` | Date of template creation |
| `designerUrl` | `string` | URL to the external template designer (dynamically generated if enabled) |
| `details` | `string` | Additional details about the latest status |
| `id` | `string` |  |
| `meta` | `map[string]any` |  |
| `occurredOn` | `string` | Date and time of last review status change |
| `options` | `map[string]any` |  |
| `reviews` | `map[string]any` | Channel-specific template reviews (keyed by channelId) |
| `status` | `string` | Template review lifecycle status |
| `template` | `map[string]any` | Properties for creating a new template |
| `templateId` | `string` | Unique template identifier (generated by the service) |
| `updatedOn` | `string` | Date of last template update |
| `variables` | `[]any` |  |

#### Example: Load

```go
template, err := client.Template(nil).Load(map[string]any{"id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(template) // the loaded record
```

#### Example: List

```go
templates, err := client.Template(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(templates) // the array of records
```

#### Example: Create

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


### Traffic

Create an instance: `traffic := client.Traffic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### TrafficFile

Create an instance: `trafficFile := client.TrafficFile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `[]any` |  |
| `id` | `string` |  |
| `path` | `string` | Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip |
| `url` | `string` | Absolute download URL with security token (expires after 15 minutes) |

#### Example: Load

```go
trafficFile, err := client.TrafficFile(nil).Load(map[string]any{"id": "traffic_file_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(trafficFile) // the loaded record
```

#### Example: List

```go
trafficFiles, err := client.TrafficFile(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(trafficFiles) // the array of records
```


### Variable

Create an instance: `variable := client.Variable(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Variable description |
| `examples` | `[]any` | Example values |
| `formats` | `[]any` | Type-specific constraint formats (e.g. |
| `name` | `string` | Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+) |
| `ref` | `string` | Optional immutable identifier for the variable (used for merge identity) |
| `type` | `string` | Optional type descriptor for validation constraints |
| `variables` | `[]any` |  |

#### Example: List

```go
variables, err := client.Variable(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(variables) // the array of records
```

#### Example: Create

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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/lm-multichannel-sdk/go/
├── lm-multichannel.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/lm-multichannel-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
message := client.Message(nil)
message.Load(map[string]any{"id": "example_id"}, nil)

// message.Data() now returns the message data from the last load
// message.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
