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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.linkmobility.com/v1",
			"auth": map[string]any{
				"prefix": "",
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
						"short": "Rich card containing media, text and/or buttons",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "carousel",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "content",
						"req": true,
						"short": "Message content.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "fromTemplate",
						"req": true,
						"short": "Content generated from a pre-defined template",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "location",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "media",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "suggestions",
						"short": "Quick replies / suggestion buttons (not applicable to fromTemplate)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "text",
						"short": "Simple text content",
						"type": "`$STRING`",
					},
				},
				"name": "content",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{templateId}/content",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": map[string]any{
										"content": "`reqdata`",
									},
									"res": "`body.content`",
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"content",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/content",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.content`",
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"content",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"template",
						},
					},
				},
			},
			"message": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "campaignId",
						"short": "Schedule grouping identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messages",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "scheduleAt",
						"req": true,
						"short": "Scheduled sending time",
						"type": "`$STRING`",
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
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/messages",
								"segments": []any{
									map[string]any{
										"lit": "messages",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"messages",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "message_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/messages/{messageId}/schedule",
								"rename": map[string]any{
									"param": map[string]any{
										"messageId": "id",
									},
								},
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
								"select": map[string]any{
									"$action": "schedule",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.schedule`",
								},
								"parts": []any{
									"messages",
									"{id}",
									"schedule",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "message_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/messages/{messageId}/schedule",
								"rename": map[string]any{
									"param": map[string]any{
										"messageId": "id",
									},
								},
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
								"select": map[string]any{
									"$action": "schedule",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"messages",
									"{id}",
									"schedule",
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
						"req": true,
						"short": "Account identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eventId",
						"req": true,
						"short": "Unique event identifier (for idempotent processing / deduplication)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messageStatusChanged",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "on",
						"req": true,
						"short": "UTC date-time when the event occurred",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "templateReviewStatusChanged",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "userMessageReceived",
						"req": true,
						"type": "`$OBJECT`",
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
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "message_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page_index",
											"orig": "page_index",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "desc:on",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/messages/{messageId}/events",
								"rename": map[string]any{
									"param": map[string]any{
										"messageId": "id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"id",
										"page_index",
										"page_size",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.events`",
								},
								"parts": []any{
									"messages",
									"{id}",
									"events",
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
						"req": true,
						"type": "`$OBJECT`",
					},
				},
				"name": "option",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{templateId}/options",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.options`",
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"options",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/options",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.options`",
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"options",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/templates/{templateId}/options",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.options`",
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"options",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"template",
						},
					},
				},
			},
			"schedule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"req": true,
						"short": "Number of active schedules",
						"type": "`$INTEGER`",
					},
				},
				"name": "schedule",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2026-02-01T10:00,2026-02-16T20:00",
											"kind": "query",
											"name": "between",
											"orig": "between",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "Europe/Zurich",
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/schedules:count",
								"segments": []any{
									map[string]any{
										"lit": "schedules:count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"between",
										"campaign_id",
										"time_zone",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"schedules:count",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "between",
											"orig": "between",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/schedules",
								"segments": []any{
									map[string]any{
										"lit": "schedules",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"between",
										"campaign_id",
										"time_zone",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"schedules",
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
						"req": true,
						"short": "Unique technical account identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "settings",
						"req": true,
						"type": "`$OBJECT`",
					},
				},
				"name": "self",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/self",
								"segments": []any{
									map[string]any{
										"lit": "self",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.account`",
								},
								"parts": []any{
									"self",
								},
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
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "settings",
						"req": true,
						"type": "`$OBJECT`",
					},
				},
				"name": "self_admin",
				"op": map[string]any{
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
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
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.settings`",
								},
								"parts": []any{
									"self",
									"settings",
								},
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
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "content",
						"short": "Message content.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "createdOn",
						"req": true,
						"short": "Date of template creation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "designerUrl",
						"short": "URL to the external template designer (dynamically generated if enabled)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "details",
						"short": "Additional details about the latest status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "meta",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
							"patch": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
						},
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "occurredOn",
						"req": true,
						"short": "Date and time of last review status change",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "options",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "reviews",
						"short": "Channel-specific template reviews (keyed by channelId)",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "Template review lifecycle status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "template",
						"req": true,
						"short": "Properties for creating a new template",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "templateId",
						"req": true,
						"short": "Unique template identifier (generated by the service)",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updatedOn",
						"short": "Date of last template update",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "variables",
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
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{templateId}/meta",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
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
								"select": map[string]any{
									"$action": "meta",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.meta`",
								},
								"parts": []any{
									"templates",
									"{id}",
									"meta",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/templates",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"template": "`reqdata`",
									},
									"res": "`body.template`",
								},
								"parts": []any{
									"templates",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page_index",
											"orig": "page_index",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "desc:updatedOn!createdOn",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/templates",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page_index",
										"page_size",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.templates`",
								},
								"parts": []any{
									"templates",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "channel_id",
											"orig": "channel_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/reviews/{channelId}",
								"rename": map[string]any{
									"param": map[string]any{
										"channelId": "channel_id",
										"templateId": "id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"channel_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"templates",
									"{id}",
									"reviews",
									"{channel_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.template`",
								},
								"parts": []any{
									"templates",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/meta",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
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
								"select": map[string]any{
									"$action": "meta",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.meta`",
								},
								"parts": []any{
									"templates",
									"{id}",
									"meta",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/reviews",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
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
								"select": map[string]any{
									"$action": "review",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.reviews`",
								},
								"parts": []any{
									"templates",
									"{id}",
									"reviews",
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/templates/{templateId}/meta",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
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
								"select": map[string]any{
									"$action": "meta",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.meta`",
								},
								"parts": []any{
									"templates",
									"{id}",
									"meta",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "channel_id",
											"orig": "channel_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/templates/{templateId}/reviews/{channelId}",
								"rename": map[string]any{
									"param": map[string]any{
										"channelId": "channel_id",
										"templateId": "id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"channel_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"templates",
									"{id}",
									"reviews",
									"{channel_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/templates/{templateId}",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"templates",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "channel_id",
											"orig": "channel_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/templates/{templateId}/reviews/{channelId}",
								"rename": map[string]any{
									"param": map[string]any{
										"channelId": "channel_id",
										"templateId": "id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"channel_id",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"templates",
									"{id}",
									"reviews",
									"{channel_id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"review",
						},
					},
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
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "path",
											"orig": "path",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"path",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"traffic",
									"files",
									"{path}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"file",
						},
					},
				},
			},
			"traffic_file": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "files",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "path",
						"req": true,
						"short": "Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"req": true,
						"short": "Absolute download URL with security token (expires after 15 minutes)",
						"type": "`$STRING`",
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
								"args": map[string]any{},
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
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.files`",
								},
								"parts": []any{
									"traffic",
									"files",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "path",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/traffic/files/{path}",
								"rename": map[string]any{
									"param": map[string]any{
										"path": "id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"traffic",
									"files",
									"{id}",
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
						"short": "Variable description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "examples",
						"short": "Example values",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "formats",
						"short": "Type-specific constraint formats (e.g.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ref",
						"short": "Optional immutable identifier for the variable (used for merge identity)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Optional type descriptor for validation constraints",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "variables",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "variable",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{templateId}/variables",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"variables",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{templateId}/variables",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.variables`",
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"variables",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/templates/{templateId}/variables",
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "template_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"variables",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"template",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
