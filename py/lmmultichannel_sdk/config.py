# LmMultichannel SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "LmMultichannel",
            "slug": "lm-multichannel",
            "version": "0.1.2",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://ocm.linkmobility.solutions/v1",
            "auth": {
                "prefix": "",
                "name": "x-api-key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "content": {},
                "message": {},
                "message_event": {},
                "option": {},
                "schedule": {},
                "self": {},
                "self_admin": {},
                "template": {},
                "template_review_event": {},
                "traffic": {},
                "traffic_file": {},
                "variable": {},
            },
        },
        "entity": {
      "content": {
        "fields": [
          {
            "name": "card",
            "title": "Card",
            "type": "`$OBJECT`",
            "short": "Rich card containing media, text and/or buttons",
          },
          {
            "name": "carousel",
            "title": "Carousel",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "fromTemplate",
            "title": "From Template",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Content generated from a pre-defined template",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "media",
            "title": "Media",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "suggestions",
            "title": "Suggestions",
            "type": "`$ARRAY`",
            "short": "Quick replies / suggestion buttons (not applicable to fromTemplate)",
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
            "short": "Simple text content",
          },
        ],
        "name": "content",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/templates/{templateId}/content",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                  {
                    "lit": "content",
                  },
                ],
                "parts": [
                  "templates",
                  "{template_id}",
                  "content",
                ],
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
                "transform": {
                  "req": {
                    "content": "`reqdata`",
                  },
                  "res": "`body.content`",
                },
                "args": {
                  "params": [
                    {
                      "name": "template_id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/content",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                  {
                    "lit": "content",
                  },
                ],
                "parts": [
                  "templates",
                  "{template_id}",
                  "content",
                ],
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.content`",
                },
                "args": {
                  "params": [
                    {
                      "name": "template_id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.template",
            ],
          ],
        },
      },
      "message": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "messages",
            "title": "Messages",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "requestId",
            "title": "Request Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique request identifier",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "message",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/messages",
                "segments": [
                  {
                    "lit": "messages",
                  },
                ],
                "parts": [
                  "messages",
                ],
                "rename": {},
                "transform": {
                  "req": {
                    "messages": "`reqdata.messages`",
                  },
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/messages/{messageId}/schedule",
                "segments": [
                  {
                    "lit": "messages",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "schedule",
                  },
                ],
                "parts": [
                  "messages",
                  "{id}",
                  "schedule",
                ],
                "rename": {
                  "param": {
                    "messageId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.schedule`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "messageId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "schedule",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/messages/{messageId}/schedule",
                "segments": [
                  {
                    "lit": "messages",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "schedule",
                  },
                ],
                "parts": [
                  "messages",
                  "{id}",
                  "schedule",
                ],
                "rename": {
                  "param": {
                    "messageId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "messageId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "schedule",
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "message_event": {
        "fields": [
          {
            "name": "accountId",
            "title": "Account Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Account identifier",
          },
          {
            "name": "eventId",
            "title": "Event Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique event identifier (for idempotent processing / deduplication)",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "messageStatusChanged",
            "title": "Message Status Changed",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "on",
            "title": "On",
            "type": "`$STRING`",
            "req": True,
            "short": "UTC date-time when the event occurred",
            "format": "date-time",
          },
          {
            "name": "templateReviewStatusChanged",
            "title": "Template Review Status Changed",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "userMessageReceived",
            "title": "User Message Received",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "message_event",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/messages/{messageId}/events",
                "segments": [
                  {
                    "lit": "messages",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "events",
                  },
                ],
                "parts": [
                  "messages",
                  "{id}",
                  "events",
                ],
                "rename": {
                  "param": {
                    "messageId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.events`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "messageId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page_index",
                      "orig": "_pageIndex",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page_size",
                      "orig": "_pageSize",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "_sort",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "desc:on",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "option": {
        "fields": [
          {
            "name": "options",
            "title": "Options",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "option",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/templates/{templateId}/options",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                  {
                    "lit": "options",
                  },
                ],
                "parts": [
                  "templates",
                  "{template_id}",
                  "options",
                ],
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.options`",
                },
                "args": {
                  "params": [
                    {
                      "name": "template_id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/options",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                  {
                    "lit": "options",
                  },
                ],
                "parts": [
                  "templates",
                  "{template_id}",
                  "options",
                ],
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.options`",
                },
                "args": {
                  "params": [
                    {
                      "name": "template_id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/templates/{templateId}/options",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                  {
                    "lit": "options",
                  },
                ],
                "parts": [
                  "templates",
                  "{template_id}",
                  "options",
                ],
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.options`",
                },
                "args": {
                  "params": [
                    {
                      "name": "template_id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.template",
            ],
          ],
        },
      },
      "schedule": {
        "fields": [],
        "name": "schedule",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/schedules:count",
                "segments": [
                  {
                    "lit": "schedules:count",
                  },
                ],
                "parts": [
                  "schedules:count",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "between",
                      "orig": "between",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2026-02-01T10:00,2026-02-16T20:00",
                    },
                    {
                      "name": "campaign_id",
                      "orig": "campaignId",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "time_zone",
                      "orig": "timeZone",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "Europe/Zurich",
                    },
                  ],
                },
                "select": {
                  "$action": "count",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/schedules",
                "segments": [
                  {
                    "lit": "schedules",
                  },
                ],
                "parts": [
                  "schedules",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "between",
                      "orig": "between",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "campaign_id",
                      "orig": "campaignId",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "time_zone",
                      "orig": "timeZone",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "self": {
        "fields": [
          {
            "name": "accountId",
            "title": "Account Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique technical account identifier",
          },
          {
            "name": "settings",
            "title": "Settings",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "self",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/self",
                "segments": [
                  {
                    "lit": "self",
                  },
                ],
                "parts": [
                  "self",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.account`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "self_admin": {
        "fields": [
          {
            "name": "callback",
            "title": "Callback",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "settings",
            "title": "Settings",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "self_admin",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/self/settings",
                "segments": [
                  {
                    "lit": "self",
                  },
                  {
                    "lit": "settings",
                  },
                ],
                "parts": [
                  "self",
                  "settings",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.settings`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "template": {
        "fields": [
          {
            "name": "channelData",
            "title": "Channel Data",
            "type": "`$OBJECT`",
          },
          {
            "name": "content",
            "title": "Content",
            "type": "`$OBJECT`",
            "short": "Message content.",
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "req": True,
            "short": "Date of template creation",
            "format": "date-time",
          },
          {
            "name": "designerUrl",
            "title": "Designer Url",
            "type": "`$STRING`",
            "short": "URL to the external template designer (dynamically generated if enabled)",
          },
          {
            "name": "details",
            "title": "Details",
            "type": "`$STRING`",
            "short": "Additional details about the latest status",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "meta",
            "title": "Meta",
            "type": "`$OBJECT`",
          },
          {
            "name": "occurredOn",
            "title": "Occurred On",
            "type": "`$STRING`",
            "req": True,
            "short": "Date and time of last review status change",
            "format": "date-time",
          },
          {
            "name": "options",
            "title": "Options",
            "type": "`$OBJECT`",
          },
          {
            "name": "reviews",
            "title": "Reviews",
            "type": "`$OBJECT`",
            "short": "Channel-specific template reviews (keyed by channelId)",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Template review lifecycle status.",
          },
          {
            "name": "templateId",
            "title": "Template Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique template identifier (generated by the service)",
          },
          {
            "name": "updatedOn",
            "title": "Updated On",
            "type": "`$STRING`",
            "short": "Date of last template update",
            "format": "date-time",
          },
          {
            "name": "variables",
            "title": "Variables",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "template",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/templates/{templateId}/meta",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "meta",
                  },
                ],
                "parts": [
                  "templates",
                  "{id}",
                  "meta",
                ],
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.meta`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "meta",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/templates",
                "segments": [
                  {
                    "lit": "templates",
                  },
                ],
                "parts": [
                  "templates",
                ],
                "rename": {},
                "transform": {
                  "req": {
                    "template": "`reqdata`",
                  },
                  "res": "`body.template`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/templates",
                "segments": [
                  {
                    "lit": "templates",
                  },
                ],
                "parts": [
                  "templates",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.templates`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page_index",
                      "orig": "_pageIndex",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page_size",
                      "orig": "_pageSize",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "_sort",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "desc:updatedOn!createdOn",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/reviews/{channelId}",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "reviews",
                  },
                  {
                    "var": "channel_id",
                  },
                ],
                "parts": [
                  "templates",
                  "{id}",
                  "reviews",
                  "{channel_id}",
                ],
                "rename": {
                  "param": {
                    "channelId": "channel_id",
                    "templateId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "channel_id",
                      "orig": "channelId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "channel_id",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "templates",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.template`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/meta",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "meta",
                  },
                ],
                "parts": [
                  "templates",
                  "{id}",
                  "meta",
                ],
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.meta`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "meta",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/reviews",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "reviews",
                  },
                ],
                "parts": [
                  "templates",
                  "{id}",
                  "reviews",
                ],
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.reviews`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "review",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/templates/{templateId}/meta",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "meta",
                  },
                ],
                "parts": [
                  "templates",
                  "{id}",
                  "meta",
                ],
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.meta`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "meta",
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/templates/{templateId}/reviews/{channelId}",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "reviews",
                  },
                  {
                    "var": "channel_id",
                  },
                ],
                "parts": [
                  "templates",
                  "{id}",
                  "reviews",
                  "{channel_id}",
                ],
                "rename": {
                  "param": {
                    "channelId": "channel_id",
                    "templateId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "channel_id",
                      "orig": "channelId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "channel_id",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/templates/{templateId}",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "templates",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/templates/{templateId}/reviews/{channelId}",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "reviews",
                  },
                  {
                    "var": "channel_id",
                  },
                ],
                "parts": [
                  "templates",
                  "{id}",
                  "reviews",
                  "{channel_id}",
                ],
                "rename": {
                  "param": {
                    "channelId": "channel_id",
                    "templateId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "channel_id",
                      "orig": "channelId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "channel_id",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "template_review_event": {
        "fields": [
          {
            "name": "accountId",
            "title": "Account Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Account identifier",
          },
          {
            "name": "eventId",
            "title": "Event Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique event identifier (for idempotent processing / deduplication)",
          },
          {
            "name": "messageStatusChanged",
            "title": "Message Status Changed",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "on",
            "title": "On",
            "type": "`$STRING`",
            "req": True,
            "short": "UTC date-time when the event occurred",
            "format": "date-time",
          },
          {
            "name": "templateReviewStatusChanged",
            "title": "Template Review Status Changed",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "userMessageReceived",
            "title": "User Message Received",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "template_review_event",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/reviews/{channelId}/events",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                  {
                    "lit": "reviews",
                  },
                  {
                    "var": "review_id",
                  },
                  {
                    "lit": "events",
                  },
                ],
                "parts": [
                  "templates",
                  "{template_id}",
                  "reviews",
                  "{review_id}",
                  "events",
                ],
                "rename": {
                  "param": {
                    "channelId": "review_id",
                    "templateId": "template_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.events`",
                },
                "args": {
                  "params": [
                    {
                      "name": "review_id",
                      "orig": "channelId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "template_id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "page_index",
                      "orig": "_pageIndex",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "page_size",
                      "orig": "_pageSize",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "sort",
                      "orig": "_sort",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "desc:on",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "review_id",
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.template",
            ],
          ],
        },
      },
      "traffic": {
        "fields": [
          {
            "name": "path",
            "title": "Path",
            "type": "`$STRING`",
            "req": True,
            "short": "Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Absolute download URL with security token (expires after 15 minutes)",
          },
        ],
        "name": "traffic",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/traffic/files",
                "segments": [
                  {
                    "lit": "traffic",
                  },
                  {
                    "lit": "files",
                  },
                ],
                "parts": [
                  "traffic",
                  "files",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.files`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/traffic/files/{path}",
                "segments": [
                  {
                    "lit": "traffic",
                  },
                  {
                    "lit": "files",
                  },
                  {
                    "var": "path",
                  },
                ],
                "parts": [
                  "traffic",
                  "files",
                  "{path}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "path",
                      "orig": "path",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "path",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "traffic_file": {
        "fields": [
          {
            "name": "files",
            "title": "Files",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "traffic_file",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/traffic/files/{path}",
                "segments": [
                  {
                    "lit": "traffic",
                  },
                  {
                    "lit": "files",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "traffic",
                  "files",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "path": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "path",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "variable": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Variable description",
          },
          {
            "name": "examples",
            "title": "Examples",
            "type": "`$ARRAY`",
            "short": "Example values",
          },
          {
            "name": "formats",
            "title": "Formats",
            "type": "`$ARRAY`",
            "short": "Type-specific constraint formats (e.g.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)",
          },
          {
            "name": "ref",
            "title": "Ref",
            "type": "`$STRING`",
            "short": "Optional immutable identifier for the variable (used for merge identity)",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Optional type descriptor for validation constraints",
          },
          {
            "name": "variables",
            "title": "Variables",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "variable",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/templates/{templateId}/variables",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                  {
                    "lit": "variables",
                  },
                ],
                "parts": [
                  "templates",
                  "{template_id}",
                  "variables",
                ],
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "template_id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/variables",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                  {
                    "lit": "variables",
                  },
                ],
                "parts": [
                  "templates",
                  "{template_id}",
                  "variables",
                ],
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.variables`",
                },
                "args": {
                  "params": [
                    {
                      "name": "template_id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/templates/{templateId}/variables",
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "template_id",
                  },
                  {
                    "lit": "variables",
                  },
                ],
                "parts": [
                  "templates",
                  "{template_id}",
                  "variables",
                ],
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "template_id",
                      "orig": "templateId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.template",
            ],
          ],
        },
      },
    },
    }
