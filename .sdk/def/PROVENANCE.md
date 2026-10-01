# Provenance of the API definition

`multichannel-openapi.yaml` is LINK Mobility's published definition of the
MyLINK Multichannel API, copied byte for byte. Nothing in it has been changed.

| | |
|---|---|
| Vendor file | `Multichannel-API-5_3_updated.yaml` |
| Source URL | https://docs.linkmobility.com/api/specs/file/Multichannel-API-5_3_updated.yaml |
| Rendered at | https://docs.linkmobility.com/api-reference/multichannel-api (the page's current version is this file) |
| Retrieved | 2026-10-01T18:39:50Z |
| Portal upload time | 2026-09-29T11:29:42Z (`updatedAt` in the docs portal's spec listing) |
| SHA-256 | `54a257e8c33dcc7f2bb71e36fc2c0e218d5fc4cf11e7719edbe9f9d2cb4584f6` |
| Size | 468,780 bytes |
| Format | OpenAPI 3.1.0, title "MyLINK Multichannel API", version `5.3.0` |
| Counts | 18 paths, 31 operations, 58 component schemas |
| Servers | `https://ocm.linkmobility.solutions/v1` (API key auth), `https://ocm.linkmobility.solutions/v2` (OAuth2 auth) |
| Auth | API key in the `x-api-key` header, or OAuth2 |
| Licence | The definition declares `info.license`: "LINK Mobility Terms and Conditions", https://www.linkmobility.com/legal/terms-and-conditions. Publishing this SDK was approved by Richard Rodger on 2026-10-01 with that licence on record. |

## Changes

None to the file. Entity corrections, if any are ever needed, belong in
`.sdk/model/guide/guide.aontu`, never in this file.

## History

The copy this replaced was version 5.0.0 of the same API: 17 paths and 30
operations on `https://api.linkmobility.com/v1` and `/v2`, with no
`info.license`. Version 5.3.0 adds
`GET /templates/{templateId}/reviews/{channelId}/events`, adds three schemas
(`FlowAction`, `TemplateReviewEventsResponse`, `UserMessageLocation`), revises
eleven others and the documentation of eighteen operations, adds the licence
above, and moves the API to `https://ocm.linkmobility.solutions`. Checked without credentials on
2026-10-01: `https://ocm.linkmobility.solutions/v1/templates` answers 403 and
`/v2/templates` 401, while `https://api.linkmobility.com/v1/templates` answers
404 "no Route matched", so the old host no longer serves this API.
