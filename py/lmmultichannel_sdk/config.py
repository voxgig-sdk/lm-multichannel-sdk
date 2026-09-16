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
            "version": "0.1.1",
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
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.linkmobility.com/v1",
            "auth": {
                "prefix": "",
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
            "short": "Rich card containing media, text and/or buttons",
            "type": "`$OBJECT`",
          },
          {
            "name": "carousel",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "content",
            "req": True,
            "short": "Message content.",
            "type": "`$OBJECT`",
          },
          {
            "name": "fromTemplate",
            "req": True,
            "short": "Content generated from a pre-defined template",
            "type": "`$OBJECT`",
          },
          {
            "name": "location",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "media",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "suggestions",
            "short": "Quick replies / suggestion buttons (not applicable to fromTemplate)",
            "type": "`$ARRAY`",
          },
          {
            "name": "text",
            "short": "Simple text content",
            "type": "`$STRING`",
          },
        ],
        "name": "content",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "template_id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/templates/{templateId}/content",
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": {
                    "content": "`reqdata`",
                  },
                  "res": "`body.content`",
                },
                "parts": [
                  "templates",
                  "{template_id}",
                  "content",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "template_id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/content",
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.content`",
                },
                "parts": [
                  "templates",
                  "{template_id}",
                  "content",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "template",
            ],
          ],
        },
      },
      "message": {
        "fields": [
          {
            "name": "campaignId",
            "short": "Schedule grouping identifier",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "messages",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "format": "date-time",
            "name": "scheduleAt",
            "req": True,
            "short": "Scheduled sending time",
            "type": "`$STRING`",
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
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/messages",
                "segments": [
                  {
                    "lit": "messages",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "messages",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "message_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/messages/{messageId}/schedule",
                "rename": {
                  "param": {
                    "messageId": "id",
                  },
                },
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
                "select": {
                  "$action": "schedule",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.schedule`",
                },
                "parts": [
                  "messages",
                  "{id}",
                  "schedule",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "message_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/messages/{messageId}/schedule",
                "rename": {
                  "param": {
                    "messageId": "id",
                  },
                },
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
                "select": {
                  "$action": "schedule",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "messages",
                  "{id}",
                  "schedule",
                ],
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
            "req": True,
            "short": "Account identifier",
            "type": "`$STRING`",
          },
          {
            "name": "eventId",
            "req": True,
            "short": "Unique event identifier (for idempotent processing / deduplication)",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "messageStatusChanged",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "format": "date-time",
            "name": "on",
            "req": True,
            "short": "UTC date-time when the event occurred",
            "type": "`$STRING`",
          },
          {
            "name": "templateReviewStatusChanged",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "userMessageReceived",
            "req": True,
            "type": "`$OBJECT`",
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
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "message_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "page_index",
                      "orig": "page_index",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "desc:on",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/messages/{messageId}/events",
                "rename": {
                  "param": {
                    "messageId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                    "page_index",
                    "page_size",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.events`",
                },
                "parts": [
                  "messages",
                  "{id}",
                  "events",
                ],
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
            "req": True,
            "type": "`$OBJECT`",
          },
        ],
        "name": "option",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "template_id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/templates/{templateId}/options",
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.options`",
                },
                "parts": [
                  "templates",
                  "{template_id}",
                  "options",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "template_id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/options",
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.options`",
                },
                "parts": [
                  "templates",
                  "{template_id}",
                  "options",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "template_id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/templates/{templateId}/options",
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.options`",
                },
                "parts": [
                  "templates",
                  "{template_id}",
                  "options",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "template",
            ],
          ],
        },
      },
      "schedule": {
        "fields": [
          {
            "name": "count",
            "req": True,
            "short": "Number of active schedules",
            "type": "`$INTEGER`",
          },
        ],
        "name": "schedule",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "2026-02-01T10:00,2026-02-16T20:00",
                      "kind": "query",
                      "name": "between",
                      "orig": "between",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "campaign_id",
                      "orig": "campaign_id",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "Europe/Zurich",
                      "kind": "query",
                      "name": "time_zone",
                      "orig": "time_zone",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/schedules:count",
                "segments": [
                  {
                    "lit": "schedules:count",
                  },
                ],
                "select": {
                  "exist": [
                    "between",
                    "campaign_id",
                    "time_zone",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "schedules:count",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "between",
                      "orig": "between",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "campaign_id",
                      "orig": "campaign_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "time_zone",
                      "orig": "time_zone",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/schedules",
                "segments": [
                  {
                    "lit": "schedules",
                  },
                ],
                "select": {
                  "exist": [
                    "between",
                    "campaign_id",
                    "time_zone",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "schedules",
                ],
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
            "req": True,
            "short": "Unique technical account identifier",
            "type": "`$STRING`",
          },
          {
            "name": "settings",
            "req": True,
            "type": "`$OBJECT`",
          },
        ],
        "name": "self",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/self",
                "segments": [
                  {
                    "lit": "self",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.account`",
                },
                "parts": [
                  "self",
                ],
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
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "settings",
            "req": True,
            "type": "`$OBJECT`",
          },
        ],
        "name": "self_admin",
        "op": {
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.settings`",
                },
                "parts": [
                  "self",
                  "settings",
                ],
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
            "type": "`$OBJECT`",
          },
          {
            "name": "content",
            "short": "Message content.",
            "type": "`$OBJECT`",
          },
          {
            "format": "date-time",
            "name": "createdOn",
            "req": True,
            "short": "Date of template creation",
            "type": "`$STRING`",
          },
          {
            "name": "designerUrl",
            "short": "URL to the external template designer (dynamically generated if enabled)",
            "type": "`$STRING`",
          },
          {
            "name": "details",
            "short": "Additional details about the latest status",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "meta",
            "op": {
              "create": {
                "req": True,
                "type": "`$OBJECT`",
              },
              "patch": {
                "req": True,
                "type": "`$OBJECT`",
              },
            },
            "type": "`$OBJECT`",
          },
          {
            "format": "date-time",
            "name": "occurredOn",
            "req": True,
            "short": "Date and time of last review status change",
            "type": "`$STRING`",
          },
          {
            "name": "options",
            "type": "`$OBJECT`",
          },
          {
            "name": "reviews",
            "short": "Channel-specific template reviews (keyed by channelId)",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "req": True,
            "short": "Template review lifecycle status",
            "type": "`$STRING`",
          },
          {
            "name": "template",
            "req": True,
            "short": "Properties for creating a new template",
            "type": "`$OBJECT`",
          },
          {
            "name": "templateId",
            "req": True,
            "short": "Unique template identifier (generated by the service)",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "updatedOn",
            "short": "Date of last template update",
            "type": "`$STRING`",
          },
          {
            "name": "variables",
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
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/templates/{templateId}/meta",
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
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
                "select": {
                  "$action": "meta",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.meta`",
                },
                "parts": [
                  "templates",
                  "{id}",
                  "meta",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/templates",
                "segments": [
                  {
                    "lit": "templates",
                  },
                ],
                "select": {},
                "transform": {
                  "req": {
                    "template": "`reqdata`",
                  },
                  "res": "`body.template`",
                },
                "parts": [
                  "templates",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "page_index",
                      "orig": "page_index",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "desc:updatedOn!createdOn",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/templates",
                "segments": [
                  {
                    "lit": "templates",
                  },
                ],
                "select": {
                  "exist": [
                    "page_index",
                    "page_size",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.templates`",
                },
                "parts": [
                  "templates",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "channel_id",
                      "orig": "channel_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/reviews/{channelId}",
                "rename": {
                  "param": {
                    "channelId": "channel_id",
                    "templateId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "channel_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "templates",
                  "{id}",
                  "reviews",
                  "{channel_id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}",
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.template`",
                },
                "parts": [
                  "templates",
                  "{id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/meta",
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
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
                "select": {
                  "$action": "meta",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.meta`",
                },
                "parts": [
                  "templates",
                  "{id}",
                  "meta",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/reviews",
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
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
                "select": {
                  "$action": "review",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.reviews`",
                },
                "parts": [
                  "templates",
                  "{id}",
                  "reviews",
                ],
              },
            ],
          },
          "patch": {
            "input": "data",
            "name": "patch",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/templates/{templateId}/meta",
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
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
                "select": {
                  "$action": "meta",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.meta`",
                },
                "parts": [
                  "templates",
                  "{id}",
                  "meta",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "channel_id",
                      "orig": "channel_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/templates/{templateId}/reviews/{channelId}",
                "rename": {
                  "param": {
                    "channelId": "channel_id",
                    "templateId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "channel_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "templates",
                  "{id}",
                  "reviews",
                  "{channel_id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/templates/{templateId}",
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "templates",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "templates",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "channel_id",
                      "orig": "channel_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/templates/{templateId}/reviews/{channelId}",
                "rename": {
                  "param": {
                    "channelId": "channel_id",
                    "templateId": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "channel_id",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "templates",
                  "{id}",
                  "reviews",
                  "{channel_id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "review",
            ],
          ],
        },
      },
      "traffic": {
        "fields": [],
        "name": "traffic",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "path",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "path",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "traffic",
                  "files",
                  "{path}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "file",
            ],
          ],
        },
      },
      "traffic_file": {
        "fields": [
          {
            "name": "files",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "path",
            "req": True,
            "short": "Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "req": True,
            "short": "Absolute download URL with security token (expires after 15 minutes)",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "traffic_file",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.files`",
                },
                "parts": [
                  "traffic",
                  "files",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "path",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/traffic/files/{path}",
                "rename": {
                  "param": {
                    "path": "id",
                  },
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "traffic",
                  "files",
                  "{id}",
                ],
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
            "short": "Variable description",
            "type": "`$STRING`",
          },
          {
            "name": "examples",
            "short": "Example values",
            "type": "`$ARRAY`",
          },
          {
            "name": "formats",
            "short": "Type-specific constraint formats (e.g.",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)",
            "type": "`$STRING`",
          },
          {
            "name": "ref",
            "short": "Optional immutable identifier for the variable (used for merge identity)",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Optional type descriptor for validation constraints",
            "type": "`$STRING`",
          },
          {
            "name": "variables",
            "req": True,
            "type": "`$ARRAY`",
          },
        ],
        "name": "variable",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "template_id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/templates/{templateId}/variables",
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "templates",
                  "{template_id}",
                  "variables",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "template_id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/templates/{templateId}/variables",
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.variables`",
                },
                "parts": [
                  "templates",
                  "{template_id}",
                  "variables",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "template_id",
                      "orig": "template_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/templates/{templateId}/variables",
                "rename": {
                  "param": {
                    "templateId": "template_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "templates",
                  "{template_id}",
                  "variables",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "template",
            ],
          ],
        },
      },
    },
    }
