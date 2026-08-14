# LmMultichannel SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$OBJECT`",
          },
          {
            "name": "fromTemplate",
            "req": True,
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
            "type": "`$ARRAY`",
          },
          {
            "name": "text",
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.content`",
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.content`",
                },
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
            "type": "`$STRING`",
          },
          {
            "name": "messages",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "scheduleAt",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "messages",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "type": "`$STRING`",
          },
          {
            "name": "eventId",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "messageStatusChanged",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "on",
            "req": True,
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
                  "res": "`body`",
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "schedules:count",
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
                "parts": [
                  "schedules",
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
                "parts": [
                  "self",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "parts": [
                  "self",
                  "settings",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$OBJECT`",
          },
          {
            "name": "content",
            "type": "`$OBJECT`",
          },
          {
            "name": "createdOn",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "designerUrl",
            "type": "`$STRING`",
          },
          {
            "name": "details",
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
            "name": "occurredOn",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "options",
            "type": "`$OBJECT`",
          },
          {
            "name": "reviews",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "template",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "templateId",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "updatedOn",
            "type": "`$STRING`",
          },
          {
            "name": "variables",
            "type": "`$ARRAY`",
          },
        ],
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
                "select": {
                  "$action": "meta",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/templates",
                "parts": [
                  "templates",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.template`",
                },
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
                "parts": [
                  "templates",
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
                  "res": "`body`",
                },
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
                "parts": [
                  "templates",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.template`",
                },
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
                "select": {
                  "$action": "meta",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "select": {
                  "$action": "review",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "select": {
                  "$action": "meta",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "templates",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "templateId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "traffic",
                  "files",
                  "{path}",
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
            "name": "path",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "traffic",
                  "files",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
          {
            "name": "examples",
            "type": "`$ARRAY`",
          },
          {
            "name": "formats",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "ref",
            "type": "`$STRING`",
          },
          {
            "name": "type",
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "select": {
                  "exist": [
                    "template_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
