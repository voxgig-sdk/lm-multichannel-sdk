"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TemplateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_MULTICHANNEL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmMultichannelSDK.test();
        const ent = testsdk.Template();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'template.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "channelData": { "a": true, "h": "Channel Data", "n": "channelData", "r": false, "t": "`$OBJECT`", "key$": "channelData", "index$": 0 }, "content": { "a": true, "h": "Content", "n": "content", "r": false, "sh": "Message content.", "t": "`$OBJECT`", "key$": "content", "index$": 1 }, "createdOn": { "a": true, "fo": "date-time", "h": "Created On", "n": "createdOn", "r": true, "sh": "Date of template creation", "t": "`$STRING`", "key$": "createdOn", "index$": 2 }, "designerUrl": { "a": true, "h": "Designer Url", "n": "designerUrl", "r": false, "sh": "URL to the external template designer (dynamically generated if enabled)", "t": "`$STRING`", "key$": "designerUrl", "index$": 3 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "sh": "Additional details about the latest status", "t": "`$STRING`", "key$": "details", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "meta": { "a": true, "h": "Meta", "n": "meta", "r": false, "t": "`$OBJECT`", "key$": "meta", "index$": 6 }, "occurredOn": { "a": true, "fo": "date-time", "h": "Occurred On", "n": "occurredOn", "r": true, "sh": "Date and time of last review status change", "t": "`$STRING`", "key$": "occurredOn", "index$": 7 }, "options": { "a": true, "h": "Options", "n": "options", "r": false, "t": "`$OBJECT`", "key$": "options", "index$": 8 }, "reviews": { "a": true, "h": "Reviews", "n": "reviews", "r": false, "sh": "Channel-specific template reviews (keyed by channelId)", "t": "`$OBJECT`", "key$": "reviews", "index$": 9 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Template review lifecycle status.", "t": "`$STRING`", "key$": "status", "index$": 10 }, "template": { "a": true, "h": "Template", "n": "template", "r": true, "sh": "Properties for creating a new template", "t": "`$OBJECT`", "key$": "template", "index$": 11 }, "templateId": { "a": true, "h": "Template Id", "n": "templateId", "r": true, "sh": "Unique template identifier (generated by the service)", "t": "`$STRING`", "key$": "templateId", "index$": 12 }, "updatedOn": { "a": true, "fo": "date-time", "h": "Updated On", "n": "updatedOn", "r": false, "sh": "Date of last template update", "t": "`$STRING`", "key$": "updatedOn", "index$": 13 }, "variables": { "a": true, "h": "Variables", "n": "variables", "r": false, "t": "`$ARRAY`", "key$": "variables", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "template", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /templates/{templateId}/meta", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/templates/{templateId}/meta", "q": { "$action": "meta", "exist": ["id"] }, "r": { "param": { "templateId": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }, { "lit": "meta" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /templates", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/templates", "q": {}, "r": {}, "s": [{ "lit": "templates" }], "t": { "req": { "template": "`reqdata`" }, "res": "`body.template`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /templates", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "page_index", "or": "_pageIndex", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "page_size", "or": "_pageSize", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "desc:updatedOn!createdOn", "k": "query", "n": "sort", "or": "_sort", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/templates", "q": { "exist": ["page_index", "page_size", "sort"] }, "r": {}, "s": [{ "lit": "templates" }], "t": { "req": "`reqdata`", "res": "`body.templates`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /templates/{templateId}/reviews/{channelId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "channel_id", "or": "channelId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/templates/{templateId}/reviews/{channelId}", "q": { "exist": ["channel_id", "id"] }, "r": { "param": { "channelId": "channel_id", "templateId": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }, { "lit": "reviews" }, { "var": "channel_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /templates/{templateId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/templates/{templateId}", "q": { "exist": ["id"] }, "r": { "param": { "templateId": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.template`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /templates/{templateId}/meta", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/templates/{templateId}/meta", "q": { "$action": "meta", "exist": ["id"] }, "r": { "param": { "templateId": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }, { "lit": "meta" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /templates/{templateId}/reviews", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/templates/{templateId}/reviews", "q": { "$action": "review", "exist": ["id"] }, "r": { "param": { "templateId": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }, { "lit": "reviews" }], "t": { "req": "`reqdata`", "res": "`body.reviews`" }, "index$": 3 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /templates/{templateId}/meta", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/templates/{templateId}/meta", "q": { "$action": "meta", "exist": ["id"] }, "r": { "param": { "templateId": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }, { "lit": "meta" }], "t": { "req": "`reqdata`", "res": "`body.meta`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /templates/{templateId}/reviews/{channelId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "channel_id", "or": "channelId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/templates/{templateId}/reviews/{channelId}", "q": { "exist": ["channel_id", "id"] }, "r": { "param": { "channelId": "channel_id", "templateId": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }, { "lit": "reviews" }, { "var": "channel_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /templates/{templateId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/templates/{templateId}", "q": { "exist": ["id"] }, "r": { "param": { "templateId": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /templates/{templateId}/reviews/{channelId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "channel_id", "or": "channelId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/templates/{templateId}/reviews/{channelId}", "q": { "exist": ["channel_id", "id"] }, "r": { "param": { "channelId": "channel_id", "templateId": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }, { "lit": "reviews" }, { "var": "channel_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "template", "name__orig": "template", "Name": "Template", "name_": "template", "name-": "template", "NAME": "TEMPLATE", "index$": 7 }, { "active": true, "entity": "template", "key$": "BasicTemplateFlow", "kind": "basic", "name": "BasicTemplateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "template_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "template_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "template_ref01", "srcdatavar": "template_ref01_data", "suffix": "_up0", "textfield": "createdOn" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-template_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "template_ref01", "srcdatavar": "template_ref01_data", "suffix": "_dt0" }, "m": { "id": "template01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-template_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "template_ref01", "suffix": "_rm0" }, "m": { "id": "template01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "template_ref01" } }], "index$": 5 }] }, 'Template', { "POST /templates/{templateId}/meta": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["meta"], "properties": { "meta": { "additionalProperties": { "type": "string" }, "examples": [{ "rcs.card.orientation": "HORIZONTAL", "sms.originatingAddress": "MYBRAND" }], "key$": "meta", "type": "object", "x-ref": "#/components/schemas/StringStringMap" } }, "examples": [{ "meta": { "author": "gabitbol", "scope": "sales", "state": "published", "version": "3" } }], "x-ref": "#/components/schemas/MetaWrapper" } } } }, "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }] }, "POST /templates": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["template"], "properties": { "template": { "type": "object", "description": "Properties for creating a new template", "properties": { "meta": { "type": "object", "additionalProperties": { "type": "string" }, "examples": [{}], "x-ref": "#/components/schemas/StringStringMap" }, "variables": { "type": "array", "items": { "type": "object", "required": [], "properties": {}, "examples": [], "x-ref": "#/components/schemas/Variable" } }, "content": { "description": "Message content. Exactly one of the content type properties must be provided:\ntext, media, location, card, carousel, or fromTemplate.\nSuggestions (quick replies) can be added to primitive content types.\n", "type": "object", "properties": { "text": {}, "media": {}, "location": {}, "card": {}, "carousel": {}, "fromTemplate": {}, "suggestions": {} }, "examples": [{}], "x-ref": "#/components/schemas/Content" }, "options": { "type": "object", "additionalProperties": { "type": "string" }, "examples": [{}], "x-ref": "#/components/schemas/StringStringMap" } }, "examples": [{ "meta": { "title": "Summer Sales" }, "content": { "text": "Hello {{firstName}} {{lastName}}!" }, "variables": [{}, {}], "options": { "sms.originatingAddress": "MyBrand" } }], "x-ref": "#/components/schemas/TemplateCreation", "key$": "template" } }, "index$": 1 }, "examples": { "sms_text_template": { "summary": "Simple SMS text template", "value": { "template": { "content": { "text": "Hello {{firstName}} {{lastName}}!" }, "variables": [{ "name": "firstName" }, { "name": "lastName" }] } } }, "sms_template_oadc": { "summary": "SMS text template with OADC option", "value": { "template": { "content": { "text": "Hello {{firstName}} {{lastName}}!" }, "options": { "sms.originatingAddress": "MyBrand" }, "variables": [{ "name": "firstName" }, { "name": "lastName" }] } } }, "rcs_card_template": { "summary": "RCS card template with buttons and typed variables", "value": { "template": { "meta": { "title": "Soldes 2022" }, "content": { "card": { "title": "Hello there!", "text": "Hello {{firstName}} {{lastName}}!", "buttons": [] } }, "options": { "rcs.card.orientation": "HORIZONTAL" }, "variables": [{ "name": "firstName", "examples": [] }, { "name": "lastName", "examples": [] }, { "name": "countryCode", "examples": [], "description": "To get country-specific details or website" }, { "name": "callUsPhoneNumber", "examples": [], "description": "Country-specific customer service number" }] } } }, "wa_text_template": { "summary": "WhatsApp: simple text template", "value": { "template": { "content": { "text": "Hello, this is a simple text message." } } } }, "wa_text_variables": { "summary": "WhatsApp: text template with variables", "value": { "template": { "content": { "text": "Hello {{firstName}} {{lastName}}, this is a text message." }, "variables": [{ "name": "firstName", "examples": [] }, { "name": "lastName", "examples": [] }] } } }, "wa_card_reply_buttons": { "summary": "WhatsApp: card with 3 reply buttons", "value": { "template": { "content": { "card": { "title": "Energy level", "text": "{{firstName}}, how is your energy level today?", "subtitle": "Please choose", "buttons": [] } }, "variables": [{ "name": "firstName", "examples": [] }] } } }, "wa_card_flow_button": { "summary": "WhatsApp: card with a Flow button (LMCL provider). The flow must exist and be published in the Meta Business Portal. The button must be of flow type. Definition keys: whatsapp.button.flow.id (required), .action (navigate|data_exchange), .screen (entry screen, sent as navigate_screen). The caption becomes the CTA text and cannot contain variables. Optionally set .token here to pass a flow token when sending - it may hold a variable resolved per message. The session-only keys .data, .messageVersion and .mode are rejected on templates. Max 1 flow button per template; UTILITY and MARKETING categories only.", "value": { "template": { "content": { "card": { "text": "{{firstName}}, ready to book your appointment?", "subtitle": "Takes 2 minutes", "buttons": [] } }, "variables": [{ "name": "firstName", "examples": [] }, { "name": "flowToken", "examples": [] }] } } }, "wa_card_url_dial": { "summary": "WhatsApp: card with OpenUrl and Dial buttons", "value": { "template": { "content": { "card": { "text": "{{firstName}}, long time no see!", "subtitle": "Let's get in touch again", "buttons": [] } }, "variables": [{ "name": "firstName", "examples": [] }, { "name": "accountId", "examples": [] }] } } }, "wa_card_image": { "summary": "WhatsApp: card with image variable and OpenUrl button", "value": { "template": { "content": { "card": { "media": {}, "text": "New painting: *{{title}}* _({{year}})_, by *{{author}}*. Enjoy!", "buttons": [] } }, "variables": [{ "name": "title", "examples": [] }, { "name": "year", "examples": [] }, { "name": "author", "examples": [] }, { "name": "paintingUrl", "examples": [] }, { "name": "paintingId", "examples": [] }] } } }, "wa_card_location": { "summary": "WhatsApp: card with location and UTILITY category", "value": { "template": { "content": { "card": { "location": {}, "text": "Hi {{firstName}}! We located *{{paintingName}}*. It is on exhibit at {{museumName}}." } }, "variables": [{ "name": "firstName", "examples": [] }, { "name": "paintingName", "examples": [] }, { "name": "museumName", "examples": [] }, { "name": "museumAddress", "examples": [] }, { "name": "museumLat", "examples": [] }, { "name": "museumLon", "examples": [] }], "options": { "whatsapp.template.category": "UTILITY" } } } }, "wa_auth_copycode": { "summary": "WhatsApp: authentication template with CopyCode, Spanish language", "value": { "template": { "content": { "card": { "text": "{{code}}", "buttons": [] } }, "variables": [{ "name": "code", "examples": [] }], "options": { "whatsapp.template.category": "AUTHENTICATION", "whatsapp.template.language": "es", "whatsapp.template.messageSendTtlSeconds": "120", "whatsapp.template.authentication.codeExpirationMinutes": "2", "whatsapp.template.authentication.addSecurityRecommendation": "true" } } } } } } } }, "parameters": [] }, "GET /templates": { "protocol": "http", "parameters": [{ "name": "_pageSize", "in": "query", "required": false, "description": "Page size for pagination (max 1000)", "schema": { "type": "integer", "maximum": 1000 }, "index$": 0 }, { "name": "_pageIndex", "in": "query", "required": false, "description": "Zero-based page index", "schema": { "type": "integer" }, "index$": 1 }, { "name": "_sort", "in": "query", "required": false, "description": "Sort by property paths with optional asc:/desc: prefix and ! null-coalescing", "schema": { "type": "string" }, "examples": { "by_updated": { "summary": "By last update, newest first", "value": "desc:updatedOn!createdOn" }, "by_meta_and_review": { "summary": "By author then review status", "value": "asc:meta.author,desc:reviews.whatsapp.status" } }, "index$": 2 }] }, "GET /templates/{templateId}/reviews/{channelId}": { "protocol": "http", "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }, { "name": "channelId", "in": "path", "required": true, "schema": { "type": "string", "enum": ["sms", "rcs", "viber", "whatsapp", "mock"] }, "description": "Channel identifier", "x-ref": "#/components/parameters/ChannelId", "index$": 1 }] }, "GET /templates/{templateId}": { "protocol": "http", "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }] }, "GET /templates/{templateId}/meta": { "protocol": "http", "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }] }, "GET /templates/{templateId}/reviews": { "protocol": "http", "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }] }, "PATCH /templates/{templateId}/meta": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["meta"], "properties": { "meta": { "additionalProperties": { "type": "string" }, "examples": [{ "rcs.card.orientation": "HORIZONTAL", "sms.originatingAddress": "MYBRAND" }], "key$": "meta", "type": "object", "x-ref": "#/components/schemas/StringStringMap" } }, "examples": [{ "meta": { "author": "gabitbol", "scope": "sales", "state": "published", "version": "3" } }], "x-ref": "#/components/schemas/MetaWrapper" } } } }, "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }] }, "DELETE /templates/{templateId}/reviews/{channelId}": { "protocol": "http", "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }, { "name": "channelId", "in": "path", "required": true, "schema": { "type": "string", "enum": ["sms", "rcs", "viber", "whatsapp", "mock"] }, "description": "Channel identifier", "x-ref": "#/components/parameters/ChannelId", "index$": 1 }] }, "DELETE /templates/{templateId}": { "protocol": "http", "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }] }, "PUT /templates/{templateId}/reviews/{channelId}": { "protocol": "http", "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }, { "name": "channelId", "in": "path", "required": true, "schema": { "type": "string", "enum": ["sms", "rcs", "viber", "whatsapp", "mock"] }, "description": "Channel identifier", "x-ref": "#/components/parameters/ChannelId", "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const template_ref01_ent = client.Template();
        let template_ref01_data = setup.data.new.template['template_ref01'];
        template_ref01_data = (await template_ref01_ent.create(template_ref01_data)).data();
        (0, node_assert_1.default)(null != template_ref01_data.id);
        // LIST
        const template_ref01_match = {};
        const template_ref01_list = (await template_ref01_ent.list(template_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(template_ref01_list, { id: template_ref01_data.id })));
        // UPDATE
        const template_ref01_data_up0 = {};
        template_ref01_data_up0.id = template_ref01_data.id;
        const template_ref01_markdef_up0 = { name: 'createdOn', value: 'Mark01-template_ref01_' + setup.now };
        template_ref01_data_up0[template_ref01_markdef_up0.name] = template_ref01_markdef_up0.value;
        const template_ref01_resdata_up0 = (await template_ref01_ent.update(template_ref01_data_up0)).data();
        (0, node_assert_1.default)(template_ref01_resdata_up0.id === template_ref01_data_up0.id);
        (0, node_assert_1.default)(template_ref01_resdata_up0[template_ref01_markdef_up0.name] === template_ref01_markdef_up0.value);
        // LOAD
        const template_ref01_match_dt0 = {};
        template_ref01_match_dt0.id = template_ref01_data.id;
        const template_ref01_data_dt0 = (await template_ref01_ent.load(template_ref01_match_dt0)).data();
        (0, node_assert_1.default)(template_ref01_data_dt0.id === template_ref01_data.id);
        // REMOVE
        const template_ref01_match_rm0 = { id: template_ref01_data.id };
        await template_ref01_ent.remove(template_ref01_match_rm0);
        // LIST
        const template_ref01_match_rt0 = {};
        const template_ref01_list_rt0 = (await template_ref01_ent.list(template_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(template_ref01_list_rt0, { id: template_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/template/TemplateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmMultichannelSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['template01', 'template02', 'template03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_MULTICHANNEL_TEST_TEMPLATE_ENTID': idmap,
        'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
        'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
        'LM_MULTICHANNEL_APIKEY': '',
    });
    idmap = env['LM_MULTICHANNEL_TEST_TEMPLATE_ENTID'];
    const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_MULTICHANNEL_TEST_TEMPLATE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LmMultichannelSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.LM_MULTICHANNEL_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LM_MULTICHANNEL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=TemplateEntity.test.js.map