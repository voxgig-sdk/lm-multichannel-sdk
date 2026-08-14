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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "fromTemplate",
						"req": true,
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "text",
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.content`",
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.content`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messages",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "scheduleAt",
						"req": true,
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"messages",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eventId",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messageStatusChanged",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "on",
						"req": true,
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
									"res": "`body`",
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"schedules:count",
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
								"parts": []any{
									"schedules",
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
								"parts": []any{
									"self",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"self",
									"settings",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "createdOn",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "designerUrl",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "details",
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
						"name": "occurredOn",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "options",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "reviews",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "template",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "templateId",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedOn",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "variables",
						"type": "`$ARRAY`",
					},
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
								"select": map[string]any{
									"$action": "meta",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/templates",
								"parts": []any{
									"templates",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.template`",
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
								"parts": []any{
									"templates",
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
									"res": "`body`",
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
								"parts": []any{
									"templates",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
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
								"select": map[string]any{
									"$action": "meta",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"select": map[string]any{
									"$action": "review",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"select": map[string]any{
									"$action": "meta",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"templates",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"templateId": "id",
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
								"parts": []any{
									"traffic",
									"files",
									"{path}",
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
						"name": "path",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"req": true,
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"traffic",
									"files",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "examples",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "formats",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ref",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"select": map[string]any{
									"exist": []any{
										"template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
