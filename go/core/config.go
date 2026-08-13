package core

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
						"active": true,
						"name": "card",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "carousel",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "content",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "fromTemplate",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "location",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "media",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "suggestions",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "text",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
				},
				"name": "content",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
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
						"active": true,
						"name": "campaignId",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "messages",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "scheduleAt",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
				},
				"name": "message",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "message_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "message_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
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
						"active": true,
						"name": "accountId",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "eventId",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "messageStatusChanged",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "on",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "templateReviewStatusChanged",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "userMessageReceived",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 5,
					},
				},
				"name": "message_event",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "message_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "page_index",
											"orig": "page_index",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": "desc:on",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"reqd": false,
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
								"index$": 0,
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
						"active": true,
						"name": "options",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 0,
					},
				},
				"name": "option",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
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
						"active": true,
						"name": "count",
						"req": true,
						"type": "`$INTEGER`",
						"index$": 0,
					},
				},
				"name": "schedule",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "2026-02-01T10:00,2026-02-16T20:00",
											"kind": "query",
											"name": "between",
											"orig": "between",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "campaign_id",
											"orig": "campaign_id",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "Europe/Zurich",
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"reqd": false,
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
								"index$": 0,
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "between",
											"orig": "between",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "campaign_id",
											"orig": "campaign_id",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "time_zone",
											"orig": "time_zone",
											"reqd": false,
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
								"index$": 0,
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
						"active": true,
						"name": "accountId",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "settings",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 1,
					},
				},
				"name": "self",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "callback",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "settings",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 1,
					},
				},
				"name": "self_admin",
				"op": map[string]any{
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "channelData",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "content",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "createdOn",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "designerUrl",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "details",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
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
						"req": false,
						"type": "`$OBJECT`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "occurredOn",
						"req": true,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "options",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "reviews",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": true,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "template",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "templateId",
						"req": true,
						"type": "`$STRING`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "updatedOn",
						"req": false,
						"type": "`$STRING`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "variables",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 13,
					},
				},
				"name": "template",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
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
								"index$": 1,
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "page_index",
											"orig": "page_index",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": "desc:updatedOn!createdOn",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"reqd": false,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "channel_id",
											"orig": "channel_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
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
								"index$": 2,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
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
								"index$": 3,
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
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
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "channel_id",
											"orig": "channel_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 1,
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "channel_id",
											"orig": "channel_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 1,
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
								"index$": 0,
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
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "path",
											"orig": "path",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
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
						"active": true,
						"name": "files",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "path",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "url",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
				},
				"name": "traffic_file",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "id",
											"orig": "path",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
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
						"active": true,
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "examples",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "formats",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "ref",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "variables",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 6,
					},
				},
				"name": "variable",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "template_id",
											"orig": "template_id",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
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
								"index$": 0,
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
