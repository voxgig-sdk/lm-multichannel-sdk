"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "content",
        "accessor": "Content",
        "op": "create",
        "method": "POST",
        "path": "/templates/{templateId}/content",
        "args": [
            {
                "name": "template_id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "content": {
                "card": {
                    "buttons": [
                        {
                            "caption": "x",
                            "copyCode": {
                                "value": "x"
                            },
                            "createCalendarEvent": {
                                "description": "x",
                                "endTime": "2026-01-01T00:00:00Z",
                                "startTime": "2026-01-01T00:00:00Z",
                                "title": "x"
                            },
                            "dial": {
                                "phoneNumber": "x"
                            },
                            "flow": {},
                            "openUrl": {
                                "url": "x"
                            },
                            "options": {},
                            "postback": "x",
                            "reply": {
                                "text": "x"
                            },
                            "shareLocation": {},
                            "viewLocation": {
                                "description": "x",
                                "latitude": "x",
                                "longitude": "x",
                                "query": "x"
                            }
                        }
                    ],
                    "location": {
                        "description": "x",
                        "latitude": "x",
                        "longitude": "x",
                        "title": "x"
                    },
                    "media": {
                        "description": "x",
                        "source": "x",
                        "thumbnail": "x",
                        "type": "x"
                    },
                    "subtitle": "x",
                    "text": "x",
                    "title": "x"
                },
                "carousel": {
                    "cards": [
                        {
                            "buttons": [
                                {}
                            ],
                            "location": {
                                "description": "x",
                                "latitude": "x",
                                "longitude": "x",
                                "title": "x"
                            },
                            "media": {
                                "description": "x",
                                "source": "x",
                                "thumbnail": "x",
                                "type": "x"
                            },
                            "subtitle": "x",
                            "text": "x",
                            "title": "x"
                        }
                    ],
                    "text": "x"
                },
                "fromTemplate": {
                    "templateId": "x",
                    "variables": {}
                },
                "location": {
                    "description": "x",
                    "latitude": "x",
                    "longitude": "x",
                    "title": "x"
                },
                "media": {
                    "description": "x",
                    "source": "x",
                    "thumbnail": "x",
                    "type": "x"
                },
                "suggestions": [
                    {
                        "caption": "x",
                        "copyCode": {
                            "value": "x"
                        },
                        "createCalendarEvent": {
                            "description": "x",
                            "endTime": "2026-01-01T00:00:00Z",
                            "startTime": "2026-01-01T00:00:00Z",
                            "title": "x"
                        },
                        "dial": {
                            "phoneNumber": "x"
                        },
                        "flow": {},
                        "openUrl": {
                            "url": "x"
                        },
                        "options": {},
                        "postback": "x",
                        "reply": {
                            "text": "x"
                        },
                        "shareLocation": {},
                        "viewLocation": {
                            "description": "x",
                            "latitude": "x",
                            "longitude": "x",
                            "query": "x"
                        }
                    }
                ],
                "text": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "content",
        "accessor": "Content",
        "op": "load",
        "method": "GET",
        "path": "/templates/{templateId}/content",
        "args": [
            {
                "name": "template_id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "content": {
                "card": {
                    "buttons": [
                        {
                            "caption": "x",
                            "copyCode": {
                                "value": "x"
                            },
                            "createCalendarEvent": {
                                "description": "x",
                                "endTime": "2026-01-01T00:00:00Z",
                                "startTime": "2026-01-01T00:00:00Z",
                                "title": "x"
                            },
                            "dial": {
                                "phoneNumber": "x"
                            },
                            "flow": {},
                            "openUrl": {
                                "url": "x"
                            },
                            "options": {},
                            "postback": "x",
                            "reply": {
                                "text": "x"
                            },
                            "shareLocation": {},
                            "viewLocation": {
                                "description": "x",
                                "latitude": "x",
                                "longitude": "x",
                                "query": "x"
                            }
                        }
                    ],
                    "location": {
                        "description": "x",
                        "latitude": "x",
                        "longitude": "x",
                        "title": "x"
                    },
                    "media": {
                        "description": "x",
                        "source": "x",
                        "thumbnail": "x",
                        "type": "x"
                    },
                    "subtitle": "x",
                    "text": "x",
                    "title": "x"
                },
                "carousel": {
                    "cards": [
                        {
                            "buttons": [
                                {}
                            ],
                            "location": {
                                "description": "x",
                                "latitude": "x",
                                "longitude": "x",
                                "title": "x"
                            },
                            "media": {
                                "description": "x",
                                "source": "x",
                                "thumbnail": "x",
                                "type": "x"
                            },
                            "subtitle": "x",
                            "text": "x",
                            "title": "x"
                        }
                    ],
                    "text": "x"
                },
                "fromTemplate": {
                    "templateId": "x",
                    "variables": {}
                },
                "location": {
                    "description": "x",
                    "latitude": "x",
                    "longitude": "x",
                    "title": "x"
                },
                "media": {
                    "description": "x",
                    "source": "x",
                    "thumbnail": "x",
                    "type": "x"
                },
                "suggestions": [
                    {
                        "caption": "x",
                        "copyCode": {
                            "value": "x"
                        },
                        "createCalendarEvent": {
                            "description": "x",
                            "endTime": "2026-01-01T00:00:00Z",
                            "startTime": "2026-01-01T00:00:00Z",
                            "title": "x"
                        },
                        "dial": {
                            "phoneNumber": "x"
                        },
                        "flow": {},
                        "openUrl": {
                            "url": "x"
                        },
                        "options": {},
                        "postback": "x",
                        "reply": {
                            "text": "x"
                        },
                        "shareLocation": {},
                        "viewLocation": {
                            "description": "x",
                            "latitude": "x",
                            "longitude": "x",
                            "query": "x"
                        }
                    }
                ],
                "text": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "message",
        "accessor": "Message",
        "op": "create",
        "method": "POST",
        "path": "/messages",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "requestId": "r4SKdf4bake7A",
            "messages": [
                {
                    "messageId": "ba0bb25dabdf4ba298",
                    "validUntil": "2026-01-23T18:25:43.511Z",
                    "context": {
                        "myMessageId": "560605604640",
                        "myUserId": "xavier@example.com"
                    },
                    "fallback": {
                        "messageId": "54060564ef405da45"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "message",
        "accessor": "Message",
        "op": "load",
        "method": "GET",
        "path": "/messages/{messageId}/schedule",
        "action": "schedule",
        "args": [
            {
                "name": "id",
                "wire": "messageId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "schedule": {
                "campaignId": "x",
                "scheduleAt": "2026-01-01T00:00:00Z"
            }
        },
        "idField": "id"
    },
    {
        "entity": "message",
        "accessor": "Message",
        "op": "remove",
        "method": "DELETE",
        "path": "/messages/{messageId}/schedule",
        "action": "schedule",
        "args": [
            {
                "name": "id",
                "wire": "messageId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "message_event",
        "accessor": "MessageEvent",
        "op": "list",
        "method": "GET",
        "path": "/messages/{messageId}/events",
        "args": [
            {
                "name": "id",
                "wire": "messageId",
                "value": "p1"
            }
        ],
        "select": {
            "page_index": "v1",
            "page_size": "v1",
            "sort": "v1"
        },
        "headers": [],
        "query": [
            "_pageSize",
            "_pageIndex",
            "_sort"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "_totalItemCount": 4,
            "_pageSize": 100,
            "_pageCount": 1,
            "events": [
                {
                    "eventId": "emsc5744b2da290d4132",
                    "on": "2024-11-04T15:38:26.182Z",
                    "accountId": "customer-account-id",
                    "messageStatusChanged": {
                        "messageId": "msg1uO2aI1Uwz5RHliBXLlZjM",
                        "requestId": "req600CkeP7HOeMNxmJj6b9Ut",
                        "channelId": "sms",
                        "userId": "33699999999",
                        "status": "DELIVERED",
                        "channelData": {
                            "sms.segmentCount": "2",
                            "sms.originatingAddress": "MYBRAND"
                        }
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "option",
        "accessor": "Option",
        "op": "create",
        "method": "POST",
        "path": "/templates/{templateId}/options",
        "args": [
            {
                "name": "template_id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "options": {}
        },
        "idField": "id"
    },
    {
        "entity": "option",
        "accessor": "Option",
        "op": "load",
        "method": "GET",
        "path": "/templates/{templateId}/options",
        "args": [
            {
                "name": "template_id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "options": {}
        },
        "idField": "id"
    },
    {
        "entity": "option",
        "accessor": "Option",
        "op": "update",
        "method": "PATCH",
        "path": "/templates/{templateId}/options",
        "args": [
            {
                "name": "template_id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "options": {}
        },
        "idField": "id"
    },
    {
        "entity": "schedule",
        "accessor": "Schedule",
        "op": "load",
        "method": "GET",
        "path": "/schedules:count",
        "args": [],
        "select": {
            "between": "v1",
            "campaign_id": "v1",
            "time_zone": "v1"
        },
        "headers": [],
        "query": [
            "campaignId",
            "between",
            "timeZone"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "schedule",
        "accessor": "Schedule",
        "op": "remove",
        "method": "DELETE",
        "path": "/schedules",
        "args": [],
        "select": {
            "between": "v1",
            "campaign_id": "v1",
            "time_zone": "v1"
        },
        "headers": [],
        "query": [
            "campaignId",
            "between",
            "timeZone"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "self",
        "accessor": "Self",
        "op": "load",
        "method": "GET",
        "path": "/self",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "account": {
                "accountId": "x",
                "settings": {
                    "callback": {
                        "auth": {
                            "headerName": "x",
                            "login": "x",
                            "password": "x",
                            "type": "httpBasic"
                        },
                        "enableCompression": true,
                        "signatureEnabled": true,
                        "tls": {
                            "certificate": "x",
                            "password": "x"
                        },
                        "url": "x"
                    }
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "self_admin",
        "accessor": "SelfAdmin",
        "op": "update",
        "method": "PATCH",
        "path": "/self/settings",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "settings": {
                "callback": {
                    "auth": {
                        "headerName": "x",
                        "login": "x",
                        "password": "x",
                        "type": "httpBasic"
                    },
                    "enableCompression": true,
                    "signatureEnabled": true,
                    "tls": {
                        "certificate": "x",
                        "password": "x"
                    },
                    "url": "x"
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "create",
        "method": "POST",
        "path": "/templates/{templateId}/meta",
        "action": "meta",
        "args": [
            {
                "name": "id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "meta": {}
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "create",
        "method": "POST",
        "path": "/templates",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "template": {
                "templateId": "x",
                "createdOn": "2026-01-01T00:00:00Z",
                "updatedOn": "2026-01-01T00:00:00Z",
                "meta": {},
                "variables": [
                    {
                        "name": "x",
                        "type": "text",
                        "formats": [
                            "x"
                        ],
                        "description": "x",
                        "examples": [
                            "x"
                        ],
                        "ref": "x"
                    }
                ],
                "content": {
                    "text": "x",
                    "media": {
                        "description": "x",
                        "source": "x",
                        "thumbnail": "x",
                        "type": "x"
                    },
                    "location": {
                        "description": "x",
                        "latitude": "x",
                        "longitude": "x",
                        "title": "x"
                    },
                    "card": {
                        "buttons": [
                            {
                                "caption": "x",
                                "copyCode": {},
                                "createCalendarEvent": {},
                                "dial": {},
                                "flow": {},
                                "openUrl": {},
                                "options": {},
                                "postback": "x",
                                "reply": {},
                                "shareLocation": {},
                                "viewLocation": {}
                            }
                        ],
                        "location": {
                            "description": "x",
                            "latitude": "x",
                            "longitude": "x",
                            "title": "x"
                        },
                        "media": {
                            "description": "x",
                            "source": "x",
                            "thumbnail": "x",
                            "type": "x"
                        },
                        "subtitle": "x",
                        "text": "x",
                        "title": "x"
                    },
                    "carousel": {
                        "cards": [
                            {
                                "buttons": [],
                                "location": {},
                                "media": {},
                                "subtitle": "x",
                                "text": "x",
                                "title": "x"
                            }
                        ],
                        "text": "x"
                    },
                    "fromTemplate": {
                        "templateId": "x",
                        "variables": {}
                    },
                    "suggestions": [
                        {
                            "caption": "x",
                            "copyCode": {
                                "value": "x"
                            },
                            "createCalendarEvent": {
                                "description": "x",
                                "endTime": "2026-01-01T00:00:00Z",
                                "startTime": "2026-01-01T00:00:00Z",
                                "title": "x"
                            },
                            "dial": {
                                "phoneNumber": "x"
                            },
                            "flow": {},
                            "openUrl": {
                                "url": "x"
                            },
                            "options": {},
                            "postback": "x",
                            "reply": {
                                "text": "x"
                            },
                            "shareLocation": {},
                            "viewLocation": {
                                "description": "x",
                                "latitude": "x",
                                "longitude": "x",
                                "query": "x"
                            }
                        }
                    ]
                },
                "options": {},
                "reviews": {},
                "designerUrl": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "list",
        "method": "GET",
        "path": "/templates",
        "args": [],
        "select": {
            "page_index": "v1",
            "page_size": "v1",
            "sort": "v1"
        },
        "headers": [],
        "query": [
            "_pageSize",
            "_pageIndex",
            "_sort"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "_totalItemCount": 450,
            "_filteredItemCount": 12,
            "_pageSize": 50,
            "_pageCount": 1,
            "templates": [
                {
                    "templateId": "tpl680045989c4...",
                    "createdOn": "2024-06-15T10:12:33.511Z",
                    "updatedOn": "2024-11-23T14:05:43.511Z",
                    "meta": {
                        "title": "Winter Sale 2024"
                    },
                    "reviews": {
                        "whatsapp": {
                            "status": "APPROVED"
                        }
                    }
                },
                {
                    "templateId": "tpl9382ef19390...",
                    "createdOn": "2024-03-01T09:26:43.511Z",
                    "updatedOn": "2024-09-12T11:40:22.301Z",
                    "meta": {
                        "title": "OTP Authentication"
                    },
                    "reviews": {
                        "whatsapp": {
                            "status": "APPROVED"
                        }
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "load",
        "method": "GET",
        "path": "/templates/{templateId}/reviews/{channelId}",
        "args": [
            {
                "name": "channel_id",
                "wire": "channelId",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "templateId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "whatsapp": {
                "occurredOn": "2023-02-21T18:25:43.542Z",
                "status": "SUSPENDED",
                "details": "Suspicious content",
                "channelData": {
                    "whatsapp.template.id": "213270854988610",
                    "whatsapp.template.name": "acme_tplaf938...",
                    "whatsapp.template.category": "MARKETING"
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "load",
        "method": "GET",
        "path": "/templates/{templateId}",
        "args": [
            {
                "name": "id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "template": {
                "templateId": "tplc680045989c4...",
                "createdOn": "2019-04-23T18:25:43.511Z",
                "updatedOn": "2019-04-23T18:25:43.511Z",
                "meta": {
                    "title": "Soldes 2022"
                },
                "content": {
                    "card": {
                        "title": "Hello there!",
                        "text": "Hello {{firstName}} {{lastName}}!"
                    }
                },
                "variables": [
                    {
                        "name": "firstName",
                        "examples": [
                            "Georges"
                        ]
                    },
                    {
                        "name": "lastName",
                        "examples": [
                            "Abitbol"
                        ]
                    }
                ],
                "options": {
                    "sms.originatorTON": "Promo",
                    "rcs.card.orientation": "HORIZONTAL",
                    "whatsapp.template.category": "MARKETING"
                },
                "reviews": {
                    "whatsapp": {
                        "occurredOn": "2023-02-21T18:25:43.942Z",
                        "status": "APPROVED",
                        "channelData": {
                            "whatsapp.template.id": "213270854988610",
                            "whatsapp.template.name": "acme_tplc680_soldes2022_a3f1",
                            "whatsapp.template.category": "MARKETING"
                        }
                    }
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "load",
        "method": "GET",
        "path": "/templates/{templateId}/meta",
        "action": "meta",
        "args": [
            {
                "name": "id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "meta": {}
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "load",
        "method": "GET",
        "path": "/templates/{templateId}/reviews",
        "action": "review",
        "args": [
            {
                "name": "id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "reviews": {
                "whatsapp": {
                    "occurredOn": "2023-02-21T18:25:43.301Z",
                    "status": "REJECTED",
                    "details": "ToS violation"
                },
                "mock": {
                    "occurredOn": "2023-01-21T11:33:18.581Z",
                    "status": "APPROVED",
                    "channelData": {
                        "mock.template.id": "...",
                        "mock.template.name": "...",
                        "mock.template.reviewedBy": "..."
                    }
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "remove",
        "method": "DELETE",
        "path": "/templates/{templateId}/reviews/{channelId}",
        "args": [
            {
                "name": "channel_id",
                "wire": "channelId",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "templateId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "whatsapp": {
                "occurredOn": "2023-02-21T18:25:43.542Z",
                "status": "DELETING",
                "channelData": {
                    "whatsapp.template.id": "213270854988610",
                    "whatsapp.template.name": "acme_tplaf938...",
                    "whatsapp.template.category": "MARKETING"
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "remove",
        "method": "DELETE",
        "path": "/templates/{templateId}",
        "args": [
            {
                "name": "id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "update",
        "method": "PUT",
        "path": "/templates/{templateId}/reviews/{channelId}",
        "args": [
            {
                "name": "channel_id",
                "wire": "channelId",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "templateId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "whatsapp": {
                "occurredOn": "2023-02-21T18:25:43.542Z",
                "status": "SUBMITTING"
            }
        },
        "idField": "id"
    },
    {
        "entity": "template_review_event",
        "accessor": "TemplateReviewEvent",
        "op": "list",
        "method": "GET",
        "path": "/templates/{templateId}/reviews/{channelId}/events",
        "args": [
            {
                "name": "review_id",
                "wire": "channelId",
                "value": "p1"
            },
            {
                "name": "template_id",
                "wire": "templateId",
                "value": "p2"
            }
        ],
        "select": {
            "page_index": "v1",
            "page_size": "v1",
            "sort": "v1"
        },
        "headers": [],
        "query": [
            "_pageSize",
            "_pageIndex",
            "_sort"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "_totalItemCount": 2,
            "_pageSize": 100,
            "_pageCount": 1,
            "events": [
                {
                    "eventId": "ets7YK43OsPw6h4JdoypoT7jJ",
                    "on": "2023-06-13T15:42:04.233Z",
                    "accountId": "customer-account-id",
                    "templateReviewStatusChanged": {
                        "templateId": "tplpoteCV6gCaXQ3WbAyHXS90",
                        "channelId": "whatsapp",
                        "meta": {
                            "name": "Art Tutorial"
                        },
                        "status": "APPROVED",
                        "channelData": {
                            "whatsapp.account.id": "199999999999999",
                            "whatsapp.template.id": "213270854988610",
                            "whatsapp.template.category": "UTILITY"
                        }
                    }
                },
                {
                    "eventId": "ets6jsAGrI96gLdoVUUcNScVK",
                    "on": "2023-06-13T15:40:01.118Z",
                    "accountId": "customer-account-id",
                    "templateReviewStatusChanged": {
                        "templateId": "tplpoteCV6gCaXQ3WbAyHXS90",
                        "channelId": "whatsapp",
                        "meta": {
                            "name": "Art Tutorial"
                        },
                        "status": "SUBMITTED",
                        "channelData": {
                            "whatsapp.account.id": "199999999999999",
                            "whatsapp.template.id": "213270854988610",
                            "whatsapp.template.category": "UTILITY"
                        }
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "traffic",
        "accessor": "Traffic",
        "op": "list",
        "method": "GET",
        "path": "/traffic/files",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "files": [
                {
                    "path": "x",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "traffic",
        "accessor": "Traffic",
        "op": "remove",
        "method": "DELETE",
        "path": "/traffic/files/{path}",
        "args": [
            {
                "name": "path",
                "wire": "path",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "traffic_file",
        "accessor": "TrafficFile",
        "op": "load",
        "method": "GET",
        "path": "/traffic/files/{path}",
        "args": [
            {
                "name": "id",
                "wire": "path",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "files": [
                {
                    "path": "x",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "variable",
        "accessor": "Variable",
        "op": "create",
        "method": "POST",
        "path": "/templates/{templateId}/variables",
        "args": [
            {
                "name": "template_id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "variables": [
                {
                    "description": "x",
                    "examples": [
                        "x"
                    ],
                    "formats": [
                        "x"
                    ],
                    "name": "x",
                    "ref": "x",
                    "type": "text"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "variable",
        "accessor": "Variable",
        "op": "list",
        "method": "GET",
        "path": "/templates/{templateId}/variables",
        "args": [
            {
                "name": "template_id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "variables": [
                {
                    "description": "x",
                    "examples": [
                        "x"
                    ],
                    "formats": [
                        "x"
                    ],
                    "name": "x",
                    "ref": "x",
                    "type": "text"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "variable",
        "accessor": "Variable",
        "op": "update",
        "method": "PATCH",
        "path": "/templates/{templateId}/variables",
        "args": [
            {
                "name": "template_id",
                "wire": "templateId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "variables": [
                {
                    "description": "x",
                    "examples": [
                        "x"
                    ],
                    "formats": [
                        "x"
                    ],
                    "name": "x",
                    "ref": "x",
                    "type": "text"
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map