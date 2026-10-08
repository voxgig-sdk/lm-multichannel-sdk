# MyLINK Multichannel API

> MyLINK Multichannel Messaging API allows sending messages across SMS, RCS, Viber, WhatsApp and other channels, managing message templates, downloading traffic files, and configuring account settings.
>
> The documentation is also available as an agent skill, which extends AI assistants and coding agents with in-depth knowledge of the API. The skill is published in three packages, one per family of platforms:
>
> | Package | Download | Purpose |
> | --- | --- | --- |
> | **`_Agent` `Plugins_` plugin** | [messaging-agent-plugin-5.3.0.zip](https://ocm.linkmobility.solutions/public/agent-plugins/messaging-agent-plugin-5.3.0.zip) | For the AI coding tools that support the open [Agent Plugins](https://agent-plugins.org) standard, such as GitHub Copilot, Visual Studio Code, OpenAI Codex, Cursor and Kiro. |
> | **Claude plugin** | [messaging-claude-plugin-5.3.0.zip](https://ocm.linkmobility.solutions/public/agent-plugins/messaging-claude-plugin-5.3.0.zip) | For Claude. Uploaded in claude.ai or the Claude desktop app (*Customize &gt; Plugins*), it makes the skill available in chat, in Cowork and in Claude Code. |
> | **Microsoft 365 Copilot skill** | [messaging-skills-365copilot-5.3.0.zip](https://ocm.linkmobility.solutions/public/agent-plugins/messaging-skills-365copilot-5.3.0.zip) | For Microsoft 365 Copilot agents, added as a skill in Agent Builder, which imports skills rather than plugins. |

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 12 entities and 31 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Content

Results: Content updated; Content returned.

SDK operations: `create`, `load`.

Key fields to recognise:

- `card`: Rich card containing media, text and/or buttons
- `fromTemplate`: Content generated from a pre-defined template
- `suggestions`: Quick replies / suggestion buttons (not applicable to fromTemplate)
- `text`: Simple text content

### Message

Results: Messages accepted for sending; Schedule found; Schedule deleted.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `requestId`: Unique request identifier

### MessageEvent

Results: Events found.

SDK operations: `list`.

Key fields to recognise:

- `accountId`: Account identifier
- `eventId`: Unique event identifier (for idempotent processing / deduplication)
- `on`: UTC date-time when the event occurred

### Option

Results: Options updated; Options returned.

SDK operations: `create`, `load`, `update`.

### Schedule

Results: Count returned; Deletion initiated.

SDK operations: `load`, `remove`.

### Self

Results: Account info returned.

SDK operations: `load`.

Key fields to recognise:

- `accountId`: Unique technical account identifier

### SelfAdmin

Results: Settings updated.

SDK operations: `update`.

### Template

Results: Meta updated; Template created; Template list; Review returned; Template found; Meta returned; Reviews returned; Deletion initiated; Template deleted; Submitted for review.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `content`: Message content. Exactly one of the content type properties must be provided: text, media, location, card, carousel, or fromTemplate. Suggestions (quick replies) can be added to primitive content types.
- `createdOn`: Date of template creation
- `designerUrl`: URL to the external template designer (dynamically generated if enabled)
- `details`: Additional details about the latest status
- `occurredOn`: Date and time of last review status change

### TemplateReviewEvent

Results: Events found.

SDK operations: `list`.

Key fields to recognise:

- `accountId`: Account identifier
- `eventId`: Unique event identifier (for idempotent processing / deduplication)
- `on`: UTC date-time when the event occurred

### Traffic

Results: Files listed; File deleted.

SDK operations: `list`, `remove`.

Key fields to recognise:

- `path`: Relative file path: /events/&#123;year&#125;/&#123;month&#125;/&#123;day&#125;/&#123;hour&#125;/&#123;sequence&#125;.zip
- `url`: Absolute download URL with security token (expires after 15 minutes)

### TrafficFile

Results: Files listed.

SDK operations: `load`.

### Variable

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
| Content | `create` | `POST /templates/{templateId}/content` | Required |
| Content | `load` | `GET /templates/{templateId}/content` | Required |
| Message | `create` | `POST /messages` | Required |
| Message | `load` | `GET /messages/{messageId}/schedule` | Required |
| Message | `remove` | `DELETE /messages/{messageId}/schedule` | Required |
| MessageEvent | `list` | `GET /messages/{messageId}/events` | Required |
| Option | `create` | `POST /templates/{templateId}/options` | Required |
| Option | `load` | `GET /templates/{templateId}/options` | Required |
| Option | `update` | `PATCH /templates/{templateId}/options` | Required |
| Schedule | `load` | `GET /schedules:count` | Required |
| Schedule | `remove` | `DELETE /schedules` | Required |
| Self | `load` | `GET /self` | Required |
| SelfAdmin | `update` | `PATCH /self/settings` | Required |
| Template | `create` | `POST /templates/{templateId}/meta` | Required |
| Template | `create` | `POST /templates` | Required |
| Template | `list` | `GET /templates` | Required |
| Template | `load` | `GET /templates/{templateId}/reviews/{channelId}` | Required |
| Template | `load` | `GET /templates/{templateId}` | Required |
| Template | `load` | `GET /templates/{templateId}/meta` | Required |
| Template | `load` | `GET /templates/{templateId}/reviews` | Required |
| Template | `patch` | `PATCH /templates/{templateId}/meta` | Required |
| Template | `remove` | `DELETE /templates/{templateId}/reviews/{channelId}` | Required |
| Template | `remove` | `DELETE /templates/{templateId}` | Required |
| Template | `update` | `PUT /templates/{templateId}/reviews/{channelId}` | Required |
| TemplateReviewEvent | `list` | `GET /templates/{templateId}/reviews/{channelId}/events` | Required |
| Traffic | `list` | `GET /traffic/files` | Required |
| Traffic | `remove` | `DELETE /traffic/files/{path}` | Required |
| TrafficFile | `load` | `GET /traffic/files/{path}` | Required |
| Variable | `create` | `POST /templates/{templateId}/variables` | Required |
| Variable | `list` | `GET /templates/{templateId}/variables` | Required |
| Variable | `update` | `PATCH /templates/{templateId}/variables` | Required |

## Connect to the API

- Production (API Key auth): `https://ocm.linkmobility.solutions/v1`
- Production (OAuth2 auth): `https://ocm.linkmobility.solutions/v2`

The default credential is sent in the `x-api-key` header.

API key for /v1 operations

OAuth2 client credentials for /v2 operations

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
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `lm-multichannel_list`: List records for an entity. Supported entities: `message_event`, `template`, `template_review_event`, `traffic`, `variable`.
- `lm-multichannel_load`: Load one record for an entity. Supported entities: `content`, `message`, `option`, `schedule`, `self`, `template`, `traffic_file`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `debug`: Request/response capture ring buffer for debugging
- `idempotency`: Idempotency keys for safe retries of mutating operations
- `metrics`: Statistics capture: per-operation counters and latency
- `paging`: Pagination signals for list operations
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

