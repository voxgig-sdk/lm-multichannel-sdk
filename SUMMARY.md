# MyLINK Multichannel API

Public API for MyLINK Multichannel Messaging API platform. Supports sending messages across SMS, RCS, Viber, WhatsApp and other channels, managing message templates, downloading traffic files, and configuring account settings. ## Authentication Two authentication methods are available depending on the endpoint root: - **API Key** (`/v1`): Pass your API key in the `x-api-key` HTTP header. - **OAuth2** (`/v2`): Obtain a JWT token from the CPaaS SSO token endpoint https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token and pass it as a Bearer token (clientCredentials flow type) ## Receiving events OCM produces events throughout the lifecycle of messages (`messageStatusChanged`), when end-users interact (`userMessageReceived`), and when template reviews change (`templateReviewStatusChanged`). Three methods are available to consume these events: | Method | Endpoint | Delivery | Event types | Pros | Cons | |--------|----------|----------|-------------|------|------| | **Callbacks** (webhooks) | Configured via `PATCH /self/settings` | Real-time push (HTTP POST) | All three | Lowest latency, no polling needed | Requires a publicly reachable HTTPS endpoint; must handle retries and idempotency | | **Get Message Events** | `GET /messages/&#123;messageId&#125;/events` | On-demand pull per message | `messageStatusChanged`, `userMessageReceived` only | Simple integration, no receiving endpoint needed | Shares rate limits with `POST /messages` (sending); not suited for high-traffic or bulk retrieval; no `templateReviewStatusChanged` | | **Traffic Files** | `GET /traffic/files` | Bulk pull (JSONL archives, 1 to ~15 min delay) | All three | Bulk retrieval of all events; no rate-limit impact on messaging; 30-day retention | Not real-time; requires downloading and parsing ZIP/JSONL files |

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 11 entities and 30 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Content](docs/api/content.html)

Results: Content updated; Content returned.

SDK operations: `create`, `load`.

Key fields to recognise:

- `card`: Rich card containing media, text and/or buttons
- `content`: Message content. Exactly one of the content type properties must be provided: text, media, location, card, carousel, or fromTemplate. Suggestions (quick replies) can be added to primitive content types.
- `fromTemplate`: Content generated from a pre-defined template
- `suggestions`: Quick replies / suggestion buttons (not applicable to fromTemplate)
- `text`: Simple text content

### [Message](docs/api/message.html)

Results: Messages accepted for sending; Schedule found; Schedule deleted.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `campaignId`: Schedule grouping identifier
- `scheduleAt`: Actual schedule time (may differ from request due to spreading/deferral)

### [MessageEvent](docs/api/message_event.html)

Results: Events found.

SDK operations: `list`.

Key fields to recognise:

- `accountId`: Account identifier
- `eventId`: Unique event identifier (for idempotent processing / deduplication)
- `on`: UTC date-time when the event occurred

### [Option](docs/api/option.html)

Results: Options updated; Options returned.

SDK operations: `create`, `load`, `update`.

### [Schedule](docs/api/schedule.html)

Results: Count returned; Deletion initiated.

SDK operations: `load`, `remove`.

Key fields to recognise:

- `count`: Number of active schedules

### [Self](docs/api/self.html)

Results: Account info returned.

SDK operations: `load`.

Key fields to recognise:

- `accountId`: Unique technical account identifier

### [SelfAdmin](docs/api/self_admin.html)

Results: Settings updated.

SDK operations: `update`.

### [Template](docs/api/template.html)

Results: Meta updated; Template created; Template list; Review returned; Template found; Meta returned; Reviews returned; Deletion initiated; Template deleted; Submitted for review.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `content`: Message content. Exactly one of the content type properties must be provided: text, media, location, card, carousel, or fromTemplate. Suggestions (quick replies) can be added to primitive content types.
- `createdOn`: Date of template creation
- `designerUrl`: URL to the external template designer (dynamically generated if enabled)
- `details`: Additional details about the latest status
- `occurredOn`: Date and time of last review status change

### [Traffic](docs/api/traffic.html)

Results: File deleted.

SDK operations: `remove`.

### [TrafficFile](docs/api/traffic_file.html)

Results: Files listed.

SDK operations: `list`, `load`.

Key fields to recognise:

- `path`: Relative file path: /events/&#123;year&#125;/&#123;month&#125;/&#123;day&#125;/&#123;hour&#125;/&#123;sequence&#125;.zip
- `url`: Absolute download URL with security token (expires after 15 minutes)

### [Variable](docs/api/variable.html)

Results: Variables updated; Variables returned.

SDK operations: `create`, `list`, `update`.

Key fields to recognise:

- `description`: Variable description
- `examples`: Example values
- `formats`: Type-specific constraint formats (for example culture codes, regex patterns)
- `name`: Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)
- `ref`: Optional immutable identifier for the variable (used for merge identity)

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Content](docs/api/content.html) | `create` | `POST /templates/{templateId}/content` | Required |
| [Content](docs/api/content.html) | `load` | `GET /templates/{templateId}/content` | Required |
| [Message](docs/api/message.html) | `create` | `POST /messages` | Required |
| [Message](docs/api/message.html) | `load` | `GET /messages/{messageId}/schedule` | Required |
| [Message](docs/api/message.html) | `remove` | `DELETE /messages/{messageId}/schedule` | Required |
| [MessageEvent](docs/api/message_event.html) | `list` | `GET /messages/{messageId}/events` | Required |
| [Option](docs/api/option.html) | `create` | `POST /templates/{templateId}/options` | Required |
| [Option](docs/api/option.html) | `load` | `GET /templates/{templateId}/options` | Required |
| [Option](docs/api/option.html) | `update` | `PATCH /templates/{templateId}/options` | Required |
| [Schedule](docs/api/schedule.html) | `load` | `GET /schedules:count` | Required |
| [Schedule](docs/api/schedule.html) | `remove` | `DELETE /schedules` | Required |
| [Self](docs/api/self.html) | `load` | `GET /self` | Required |
| [SelfAdmin](docs/api/self_admin.html) | `update` | `PATCH /self/settings` | Required |
| [Template](docs/api/template.html) | `create` | `POST /templates/{templateId}/meta` | Required |
| [Template](docs/api/template.html) | `create` | `POST /templates` | Required |
| [Template](docs/api/template.html) | `list` | `GET /templates` | Required |
| [Template](docs/api/template.html) | `load` | `GET /templates/{templateId}/reviews/{channelId}` | Required |
| [Template](docs/api/template.html) | `load` | `GET /templates/{templateId}` | Required |
| [Template](docs/api/template.html) | `load` | `GET /templates/{templateId}/meta` | Required |
| [Template](docs/api/template.html) | `load` | `GET /templates/{templateId}/reviews` | Required |
| [Template](docs/api/template.html) | `patch` | `PATCH /templates/{templateId}/meta` | Required |
| [Template](docs/api/template.html) | `remove` | `DELETE /templates/{templateId}/reviews/{channelId}` | Required |
| [Template](docs/api/template.html) | `remove` | `DELETE /templates/{templateId}` | Required |
| [Template](docs/api/template.html) | `update` | `PUT /templates/{templateId}/reviews/{channelId}` | Required |
| [Traffic](docs/api/traffic.html) | `remove` | `DELETE /traffic/files/{path}` | Required |
| [TrafficFile](docs/api/traffic_file.html) | `list` | `GET /traffic/files` | Required |
| [TrafficFile](docs/api/traffic_file.html) | `load` | `GET /traffic/files/{path}` | Required |
| [Variable](docs/api/variable.html) | `create` | `POST /templates/{templateId}/variables` | Required |
| [Variable](docs/api/variable.html) | `list` | `GET /templates/{templateId}/variables` | Required |
| [Variable](docs/api/variable.html) | `update` | `PATCH /templates/{templateId}/variables` | Required |

## Connect to the API

- Production (API Key auth): `https://api.linkmobility.com/v1`
- Production (OAuth2 auth): `https://api.linkmobility.com/v2`

The default credential is sent in the `x-api-key` header.

API key for /v1 endpoints

OAuth2 client credentials for /v2 endpoints

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `lm-multichannel_list`: List records for an entity. Supported entities: `message_event`, `template`, `traffic_file`, `variable`.
- `lm-multichannel_load`: Load one record for an entity. Supported entities: `content`, `message`, `option`, `schedule`, `self`, `template`, `traffic_file`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

