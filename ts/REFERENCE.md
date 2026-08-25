# LmMultichannel TypeScript SDK Reference

Complete API reference for the LmMultichannel TypeScript SDK.


## LmMultichannelSDK

### Constructor

```ts
new LmMultichannelSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmMultichannelSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LmMultichannelSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LmMultichannelSDK` instance in test mode.


### Instance Methods

#### `Content(data?: object)`

Create a new `Content` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContentEntity` instance.

#### `Message(data?: object)`

Create a new `Message` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessageEntity` instance.

#### `MessageEvent(data?: object)`

Create a new `MessageEvent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessageEventEntity` instance.

#### `Option(data?: object)`

Create a new `Option` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OptionEntity` instance.

#### `Schedule(data?: object)`

Create a new `Schedule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScheduleEntity` instance.

#### `Self(data?: object)`

Create a new `Self` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SelfEntity` instance.

#### `SelfAdmin(data?: object)`

Create a new `SelfAdmin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SelfAdminEntity` instance.

#### `Template(data?: object)`

Create a new `Template` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateEntity` instance.

#### `Traffic(data?: object)`

Create a new `Traffic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrafficEntity` instance.

#### `TrafficFile(data?: object)`

Create a new `TrafficFile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrafficFileEntity` instance.

#### `Variable(data?: object)`

Create a new `Variable` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VariableEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LmMultichannelSDK.test()`.

**Returns:** `LmMultichannelSDK` instance in test mode.


---

## ContentEntity

```ts
const content = client.Content()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `card` | `Record<string, any>` | No | Rich card containing media, text and/or buttons |
| `carousel` | `Record<string, any>` | Yes |  |
| `content` | `Record<string, any>` | Yes | Message content. |
| `fromTemplate` | `Record<string, any>` | Yes | Content generated from a pre-defined template |
| `location` | `Record<string, any>` | Yes |  |
| `media` | `Record<string, any>` | Yes |  |
| `suggestions` | `any[]` | No | Quick replies / suggestion buttons (not applicable to fromTemplate) |
| `text` | `string` | No | Simple text content |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Content().create({
  template_id: 'example_template_id',
  carousel: {},
  content: {},
  fromTemplate: {},
  location: {},
  media: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Content().load({ template_id: 'template_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContentEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessageEntity

```ts
const message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaignId` | `string` | No | Schedule grouping identifier |
| `id` | `string` | No |  |
| `messages` | `any[]` | Yes |  |
| `scheduleAt` | `string` | Yes | Scheduled sending time |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `schedule` | `/messages/{messageId}/schedule` | `client.Message().load({ $action: 'schedule', ... })` |
| `schedule` | `/messages/{messageId}/schedule` | `client.Message().remove({ $action: 'schedule', ... })` |

An action returns that action's OWN response, which is not necessarily a
Message record — check the API definition for its shape.

```ts
const result = await client.Message().load({
  $action: 'schedule',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Message().create({
  messages: [],
  scheduleAt: 'example_scheduleAt',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Message().load({ id: 'message_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Message().remove({ id: 'message_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessageEventEntity

```ts
const message_event = client.MessageEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `string` | Yes | Account identifier |
| `eventId` | `string` | Yes | Unique event identifier (for idempotent processing / deduplication) |
| `id` | `string` | No |  |
| `messageStatusChanged` | `Record<string, any>` | Yes |  |
| `on` | `string` | Yes | UTC date-time when the event occurred |
| `templateReviewStatusChanged` | `Record<string, any>` | Yes |  |
| `userMessageReceived` | `Record<string, any>` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MessageEvent().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessageEventEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OptionEntity

```ts
const option = client.Option()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | `Record<string, any>` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Option().create({
  template_id: 'example_template_id',
  options: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Option().load({ template_id: 'template_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Option().update({
  template_id: 'template_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScheduleEntity

```ts
const schedule = client.Schedule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | Yes | Number of active schedules |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Schedule().load()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Schedule().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScheduleEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SelfEntity

```ts
const self = client.Self()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `string` | Yes | Unique technical account identifier |
| `settings` | `Record<string, any>` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Self().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SelfEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SelfAdminEntity

```ts
const self_admin = client.SelfAdmin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `callback` | `Record<string, any>` | Yes |  |
| `settings` | `Record<string, any>` | Yes |  |

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.SelfAdmin().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SelfAdminEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateEntity

```ts
const template = client.Template()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `channelData` | `Record<string, any>` | No |  |
| `content` | `Record<string, any>` | No | Message content. |
| `createdOn` | `string` | Yes | Date of template creation |
| `designerUrl` | `string` | No | URL to the external template designer (dynamically generated if enabled) |
| `details` | `string` | No | Additional details about the latest status |
| `id` | `string` | No |  |
| `meta` | `Record<string, any>` | No |  |
| `occurredOn` | `string` | Yes | Date and time of last review status change |
| `options` | `Record<string, any>` | No |  |
| `reviews` | `Record<string, any>` | No | Channel-specific template reviews (keyed by channelId) |
| `status` | `string` | Yes | Template review lifecycle status |
| `template` | `Record<string, any>` | Yes | Properties for creating a new template |
| `templateId` | `string` | Yes | Unique template identifier (generated by the service) |
| `updatedOn` | `string` | No | Date of last template update |
| `variables` | `any[]` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `channelData` | - | - | - | - | - |
| `content` | - | - | - | - | - |
| `createdOn` | - | - | - | - | - |
| `designerUrl` | - | - | - | - | - |
| `details` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `meta` | - | - | Yes | - | - |
| `occurredOn` | - | - | - | - | - |
| `options` | - | - | - | - | - |
| `reviews` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `template` | - | - | - | - | - |
| `templateId` | - | - | - | - | - |
| `updatedOn` | - | - | - | - | - |
| `variables` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `meta` | `/templates/{templateId}/meta` | `client.Template().create({ $action: 'meta', ... })` |
| `meta` | `/templates/{templateId}/meta` | `client.Template().load({ $action: 'meta', ... })` |
| `review` | `/templates/{templateId}/reviews` | `client.Template().load({ $action: 'review', ... })` |
| `meta` | `/templates/{templateId}/meta` | `client.Template().patch({ $action: 'meta', ... })` |

An action returns that action's OWN response, which is not necessarily a
Template record — check the API definition for its shape.

```ts
const result = await client.Template().create({
  $action: 'meta',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Template().create({
  createdOn: 'example_createdOn',
  occurredOn: 'example_occurredOn',
  status: 'example_status',
  template: {},
  templateId: 'example_templateId',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Template().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Template().load({ id: 'template_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Template().remove({ id: 'template_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Template().update({
  id: 'template_id',
  channel_id: 'channel_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TrafficEntity

```ts
const traffic = client.Traffic()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Traffic().remove({ path: 'path' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TrafficEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TrafficFileEntity

```ts
const traffic_file = client.TrafficFile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `files` | `any[]` | Yes |  |
| `id` | `string` | No |  |
| `path` | `string` | Yes | Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip |
| `url` | `string` | Yes | Absolute download URL with security token (expires after 15 minutes) |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.TrafficFile().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.TrafficFile().load({ id: 'traffic_file_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TrafficFileEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VariableEntity

```ts
const variable = client.Variable()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Variable description |
| `examples` | `any[]` | No | Example values |
| `formats` | `any[]` | No | Type-specific constraint formats (e.g. |
| `name` | `string` | Yes | Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+) |
| `ref` | `string` | No | Optional immutable identifier for the variable (used for merge identity) |
| `type` | `string` | No | Optional type descriptor for validation constraints |
| `variables` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Variable().create({
  template_id: 'example_template_id',
  name: 'example_name',
  variables: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Variable().list({ template_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Variable().update({
  template_id: 'template_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VariableEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmMultichannelSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new LmMultichannelSDK({
  feature: {
    test: { active: true },
  }
})
```

