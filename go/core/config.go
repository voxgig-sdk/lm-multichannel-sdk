package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "LmMultichannel",
			"slug": "lm-multichannel",
			"version": "0.1.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.linkmobility.com/v1",
			"auth": map[string]any{
				"prefix": "",
				"name": "x-api-key",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"content": map[string]any{},
				"message": map[string]any{},
				"message_event": map[string]any{},
				"option": map[string]any{},
				"schedule": map[string]any{},
				"self": map[string]any{},
				"self_admin": map[string]any{},
				"template": map[string]any{},
				"traffic": map[string]any{},
				"traffic_file": map[string]any{},
				"variable": map[string]any{},
			},
		},
		"entity": map[string]any{
			"content": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "card",
						"title": "Card",
						"type": "`$OBJECT`",
						"short": "Rich card containing media, text and/or buttons",
					},
					map[string]any{
						"name": "carousel",
						"title": "Carousel",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Message content.",
					},
					map[string]any{
						"name": "fromTemplate",
						"title": "From Template",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Content generated from a pre-defined template",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "media",
						"title": "Media",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "suggestions",
						"title": "Suggestions",
						"type": "`$ARRAY`",
						"short": "Quick replies / suggestion buttons (not applicable to fromTemplate)",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"short": "Simple text content",
					},
				},
				"name": "content",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{templateId}/content",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "content",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"content",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
								"transform": map[string]any{
									"req": map[string]any{
										"content": "`reqdata`",
									},
									"res": "`body.content`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/content",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "content",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"content",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.content`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.template",
						},
					},
				},
			},
			"message": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "message",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/messages",
								"segments": []any{
									map[string]any{
										"lit": "messages",
									},
								},
								"parts": []any{
									"messages",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/messages/{messageId}/schedule",
								"segments": []any{
									map[string]any{
										"lit": "messages",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "schedule",
									},
								},
								"parts": []any{
									"messages",
									"{id}",
									"schedule",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"messageId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.schedule`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "message_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "schedule",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/messages/{messageId}/schedule",
								"segments": []any{
									map[string]any{
										"lit": "messages",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "schedule",
									},
								},
								"parts": []any{
									"messages",
									"{id}",
									"schedule",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"messageId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "message_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "schedule",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"message_event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accountId",
						"title": "Account Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Account identifier",
					},
					map[string]any{
						"name": "eventId",
						"title": "Event Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique event identifier (for idempotent processing / deduplication)",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messageStatusChanged",
						"title": "Message Status Changed",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "on",
						"title": "On",
						"type": "`$STRING`",
						"req": true,
						"short": "UTC date-time when the event occurred",
						"format": "date-time",
					},
					map[string]any{
						"name": "templateReviewStatusChanged",
						"title": "Template Review Status Changed",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "userMessageReceived",
						"title": "User Message Received",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "message_event",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/messages/{messageId}/events",
								"segments": []any{
									map[string]any{
										"lit": "messages",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "events",
									},
								},
								"parts": []any{
									"messages",
									"{id}",
									"events",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"messageId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.events`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "message_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page_index",
											"orig": "page_index",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc:on",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"page_index",
										"page_size",
										"sort",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"option": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "options",
						"title": "Options",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "option",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{templateId}/options",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "options",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"options",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.options`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/options",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "options",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"options",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.options`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/templates/{templateId}/options",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "options",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"options",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.options`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.template",
						},
					},
				},
			},
			"schedule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"title": "Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of active schedules",
					},
				},
				"name": "schedule",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/schedules:count",
								"segments": []any{
									map[string]any{
										"lit": "schedules:count",
									},
								},
								"parts": []any{
									"schedules:count",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "between",
											"orig": "between",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2026-02-01T10:00,2026-02-16T20:00",
										},
										map[string]any{
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Europe/Zurich",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"between",
										"campaign_id",
										"time_zone",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/schedules",
								"segments": []any{
									map[string]any{
										"lit": "schedules",
									},
								},
								"parts": []any{
									"schedules",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "between",
											"orig": "between",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"between",
										"campaign_id",
										"time_zone",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"self": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accountId",
						"title": "Account Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique technical account identifier",
					},
					map[string]any{
						"name": "settings",
						"title": "Settings",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "self",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/self",
								"segments": []any{
									map[string]any{
										"lit": "self",
									},
								},
								"parts": []any{
									"self",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.account`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"self_admin": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "callback",
						"title": "Callback",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "settings",
						"title": "Settings",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "self_admin",
				"op": map[string]any{
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/self/settings",
								"segments": []any{
									map[string]any{
										"lit": "self",
									},
									map[string]any{
										"lit": "settings",
									},
								},
								"parts": []any{
									"self",
									"settings",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.settings`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"template": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "channelData",
						"title": "Channel Data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$OBJECT`",
						"short": "Message content.",
					},
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"short": "Date of template creation",
						"format": "date-time",
					},
					map[string]any{
						"name": "designerUrl",
						"title": "Designer Url",
						"type": "`$STRING`",
						"short": "URL to the external template designer (dynamically generated if enabled)",
					},
					map[string]any{
						"name": "details",
						"title": "Details",
						"type": "`$STRING`",
						"short": "Additional details about the latest status",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "meta",
						"title": "Meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "occurredOn",
						"title": "Occurred On",
						"type": "`$STRING`",
						"req": true,
						"short": "Date and time of last review status change",
						"format": "date-time",
					},
					map[string]any{
						"name": "options",
						"title": "Options",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "reviews",
						"title": "Reviews",
						"type": "`$OBJECT`",
						"short": "Channel-specific template reviews (keyed by channelId)",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "Template review lifecycle status",
					},
					map[string]any{
						"name": "template",
						"title": "Template",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Properties for creating a new template",
					},
					map[string]any{
						"name": "templateId",
						"title": "Template Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique template identifier (generated by the service)",
					},
					map[string]any{
						"name": "updatedOn",
						"title": "Updated On",
						"type": "`$STRING`",
						"short": "Date of last template update",
						"format": "date-time",
					},
					map[string]any{
						"name": "variables",
						"title": "Variables",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "template",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{templateId}/meta",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "meta",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
									"meta",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.meta`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "meta",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/templates",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
								},
								"parts": []any{
									"templates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"template": "`reqdata`",
									},
									"res": "`body.template`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
								},
								"parts": []any{
									"templates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.templates`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page_index",
											"orig": "page_index",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc:updatedOn!createdOn",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page_index",
										"page_size",
										"sort",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/reviews/{channelId}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "reviews",
									},
									map[string]any{
										"var": "channel_id",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
									"reviews",
									"{channel_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"channelId": "channel_id",
										"templateId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "channel_id",
											"orig": "channel_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"channel_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.template`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/meta",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "meta",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
									"meta",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.meta`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "meta",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/reviews",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "reviews",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
									"reviews",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.reviews`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "review",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/templates/{templateId}/meta",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "meta",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
									"meta",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.meta`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "meta",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/templates/{templateId}/reviews/{channelId}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "reviews",
									},
									map[string]any{
										"var": "channel_id",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
									"reviews",
									"{channel_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"channelId": "channel_id",
										"templateId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "channel_id",
											"orig": "channel_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"channel_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/templates/{templateId}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/templates/{templateId}/reviews/{channelId}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "reviews",
									},
									map[string]any{
										"var": "channel_id",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
									"reviews",
									"{channel_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"channelId": "channel_id",
										"templateId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "channel_id",
											"orig": "channel_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"channel_id",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"traffic": map[string]any{
				"fields": []any{},
				"name": "traffic",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/traffic/files/{path}",
								"segments": []any{
									map[string]any{
										"lit": "traffic",
									},
									map[string]any{
										"lit": "files",
									},
									map[string]any{
										"var": "path",
									},
								},
								"parts": []any{
									"traffic",
									"files",
									"{path}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "path",
											"orig": "path",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"path",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"traffic_file": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "files",
						"title": "Files",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "path",
						"title": "Path",
						"type": "`$STRING`",
						"req": true,
						"short": "Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute download URL with security token (expires after 15 minutes)",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "traffic_file",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/traffic/files",
								"segments": []any{
									map[string]any{
										"lit": "traffic",
									},
									map[string]any{
										"lit": "files",
									},
								},
								"parts": []any{
									"traffic",
									"files",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.files`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/traffic/files/{path}",
								"segments": []any{
									map[string]any{
										"lit": "traffic",
									},
									map[string]any{
										"lit": "files",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"traffic",
									"files",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"path": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "path",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"variable": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Variable description",
					},
					map[string]any{
						"name": "examples",
						"title": "Examples",
						"type": "`$ARRAY`",
						"short": "Example values",
					},
					map[string]any{
						"name": "formats",
						"title": "Formats",
						"type": "`$ARRAY`",
						"short": "Type-specific constraint formats (e.g.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)",
					},
					map[string]any{
						"name": "ref",
						"title": "Ref",
						"type": "`$STRING`",
						"short": "Optional immutable identifier for the variable (used for merge identity)",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Optional type descriptor for validation constraints",
					},
					map[string]any{
						"name": "variables",
						"title": "Variables",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "variable",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{templateId}/variables",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "variables",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"variables",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/variables",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "variables",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"variables",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.variables`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/templates/{templateId}/variables",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "variables",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"variables",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "template_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.template",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
