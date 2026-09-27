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
(0, node_test_1.describe)('MessageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_MULTICHANNEL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmMultichannelSDK.test();
        const ent = testsdk.Message();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE;
        for (const op of ['create', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'message.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": true, "t": "`$ARRAY`", "key$": "messages", "index$": 1 } }, "id": { "field": "id", "name": "id" }, "name": "message", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /messages", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/messages", "q": {}, "r": {}, "s": [{ "lit": "messages" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /messages/{messageId}/schedule", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "message_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/messages/{messageId}/schedule", "q": { "$action": "schedule", "exist": ["id"] }, "r": { "param": { "messageId": "id" } }, "s": [{ "lit": "messages" }, { "var": "id" }, { "lit": "schedule" }], "t": { "req": "`reqdata`", "res": "`body.schedule`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /messages/{messageId}/schedule", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "message_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/messages/{messageId}/schedule", "q": { "$action": "schedule", "exist": ["id"] }, "r": { "param": { "messageId": "id" } }, "s": [{ "lit": "messages" }, { "var": "id" }, { "lit": "schedule" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "message", "name__orig": "message", "Name": "Message", "name_": "message", "name-": "message", "NAME": "MESSAGE", "index$": 1 }, { "active": true, "entity": "message", "key$": "BasicMessageFlow", "kind": "basic", "name": "BasicMessageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "message_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "message_ref01", "srcdatavar": "message_ref01_data", "suffix": "_dt0" }, "m": { "id": "message01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-message_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "message_ref01", "suffix": "_rm0" }, "m": { "id": "message01" }, "o": "remove", "s": [], "v": [], "index$": 2 }] }, 'Message', { "POST /messages": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["messages"], "properties": { "messages": { "type": "array", "minItems": 1, "maxItems": 10, "items": { "type": "object", "required": ["channelId", "userId", "content"], "description": "Message definition container", "properties": { "channelId": { "type": "string", "description": "Supported channel identifier: sms, rcs, viber, whatsapp, mock", "enum": [] }, "userId": { "type": "string", "description": "Channel-native user identifier (e.g. phone number)" }, "content": { "description": "Message content. Exactly one of the content type properties must be provided:\ntext, media, location, card, carousel, or fromTemplate.\nSuggestions (quick replies) can be added to primitive content types.\n", "type": "object", "properties": {}, "examples": [], "x-ref": "#/components/schemas/Content" }, "context": { "type": "object", "description": "Free-form client-specific correlation values (max 50 entries, keys 1-50 chars, values max 500 chars)", "maxProperties": 50, "additionalProperties": {}, "examples": [], "x-ref": "#/components/schemas/Context" }, "validUntil": { "type": "string", "format": "date-time", "description": "Absolute message expiration (ISO 8601). Cannot be combined with validFor." }, "validFor": { "type": "string", "description": "Relative message expiration (ISO 8601 duration, e.g. PT8H). Cannot be combined with validUntil." }, "scheduleAt": { "type": "string", "format": "date-time", "description": "Message sending time or start of spreading (ISO 8601). Requires scheduling feature." }, "allowedHours": { "type": "string", "description": "Allowed messaging hours (OpenStreetMap Opening Hours format). Required when whenDnd is specified." }, "whenDnd": { "type": "string", "enum": [], "description": "Behavior during disallowed hours (DND). defer requires scheduling feature." }, "spreadOver": { "type": "string", "description": "Random scheduling period (ISO 8601 duration, e.g. P7D). Requires scheduling feature." }, "timeZone": { "type": "string", "description": "IANA time zone for scheduleAt, allowedHours and validUntil (e.g. Europe/Zurich)" }, "campaignId": { "type": "string", "description": "Schedule grouping identifier for bulk counting/deletion" }, "options": { "type": "object", "additionalProperties": {}, "examples": [], "x-ref": "#/components/schemas/StringStringMap" }, "fallback": { "type": "object", "required": [], "description": "Message definition container", "properties": "[Circular *paths./messages.post.requestBody.content.application/json.schema.properties.messages.items.properties]", "examples": [], "x-ref": "#/components/schemas/Message" } }, "examples": [{ "channelId": "rcs", "userId": "33699999999", "content": {}, "context": {} }], "x-ref": "#/components/schemas/Message" }, "key$": "messages" } }, "examples": [{ "messages": [{ "channelId": "sms", "userId": "33699999999", "content": { "text": "This is a simple text sent by SMS!" } }] }], "x-ref": "#/components/schemas/SendMessagesRequest", "index$": 1 }, "examples": { "sms_text": { "summary": "SMS: simple text", "value": { "messages": [{ "channelId": "sms", "userId": "33699999999", "content": { "text": "This is a simple text sent by SMS!" } }] } }, "sms_text_oadc": { "summary": "SMS: text with custom originating address", "value": { "messages": [{ "channelId": "sms", "userId": "33699999999", "content": { "text": "This is a simple text sent by SMS!" }, "options": { "sms.originatingAddress": "OCM" } }] } }, "rcs_text": { "summary": "RCS: simple text", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "text": "This is a simple text sent by RCS!" } }] } }, "rcs_text_suggestions": { "summary": "RCS: text with 2 reply suggestions", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "text": "Hello, this is a simple text...", "suggestions": [] } }] } }, "rcs_media_jpeg": { "summary": "RCS: JPEG image", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "media": {} } }] } }, "rcs_media_video": { "summary": "RCS: WebM video", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "media": {} } }] } }, "rcs_media_video_thumbnail": { "summary": "RCS: WebM video with thumbnail", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "media": {} } }] } }, "rcs_media_suggestions": { "summary": "RCS: JPEG image with 3 reply suggestions", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "media": {}, "suggestions": [] } }] } }, "rcs_card_text": { "summary": "RCS: card with title and text", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "card": {} } }] } }, "rcs_card_buttons": { "summary": "RCS: card with media, reply/dial/openUrl buttons", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "card": {} } }] } }, "rcs_card_webview": { "summary": "RCS: card with openUrl webview (half-size)", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "card": {} } }] } }, "rcs_card_location_calendar": { "summary": "RCS: card with viewLocation, shareLocation, createCalendarEvent buttons + suggestions", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "card": {}, "suggestions": [] } }] } }, "rcs_card_short_height": { "summary": "RCS: card with short media height option", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "card": {} }, "options": { "rcs.media.height": "SHORT" } }] } }, "rcs_card_tall_height": { "summary": "RCS: card with tall media height option", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "card": {} }, "options": { "rcs.media.height": "TALL" } }] } }, "rcs_card_horizontal": { "summary": "RCS: horizontal card with buttons", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "card": {} }, "options": { "rcs.card.orientation": "HORIZONTAL" } }] } }, "rcs_card_horizontal_right_thumb": { "summary": "RCS: horizontal card with right thumbnail alignment", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "card": {} }, "options": { "rcs.card.orientation": "HORIZONTAL", "rcs.card.thumbnailImageAlignment": "RIGHT" } }] } }, "rcs_carousel": { "summary": "RCS: carousel with 3 cards", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "carousel": {} } }] } }, "rcs_carousel_small": { "summary": "RCS: carousel with small card width option", "value": { "messages": [{ "channelId": "rcs", "userId": "33699999999", "content": { "carousel": {} }, "options": { "rcs.carousel.cardWidth": "SMALL" } }] } }, "viber_text": { "summary": "Viber: simple text", "value": { "messages": [{ "channelId": "viber", "userId": "33699999999", "content": { "text": "This is a simple text sent by Viber!" } }] } }, "viber_text_all_devices": { "summary": "Viber: text to all devices", "value": { "messages": [{ "channelId": "viber", "userId": "33699999999", "content": { "text": "This is a simple text sent by Viber!" }, "options": { "viber.deviceDestination": "allDevices" } }] } }, "viber_media": { "summary": "Viber: JPEG image", "value": { "messages": [{ "channelId": "viber", "userId": "33699999999", "content": { "media": {} } }] } }, "viber_card_openurl": { "summary": "Viber: card with image and OpenUrl button", "value": { "messages": [{ "channelId": "viber", "userId": "33699999999", "content": { "card": {} } }] } }, "viber_card_dial": { "summary": "Viber: card with image and Dial button", "value": { "messages": [{ "channelId": "viber", "userId": "33699999999", "content": { "card": {} } }] } }, "whatsapp_fromtemplate_card": { "summary": "WhatsApp: fromTemplate with card (title, text, subtitle, variable)", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "fromTemplate": {} } }] } }, "whatsapp_fromtemplate_alt_phone": { "summary": "WhatsApp: fromTemplate via non-default phone number", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "fromTemplate": {} }, "options": { "whatsapp.phoneNumber": "33188888888" } }] } }, "whatsapp_fromtemplate_video": { "summary": "WhatsApp: fromTemplate with video header", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "fromTemplate": {} } }] } }, "whatsapp_fromtemplate_pdf": { "summary": "WhatsApp: fromTemplate with PDF document header", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "fromTemplate": {} } }] } }, "whatsapp_fromtemplate_location": { "summary": "WhatsApp: fromTemplate with location header", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "fromTemplate": {} } }] } }, "whatsapp_session_text": { "summary": "WhatsApp: session text with URL", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "text": "Thank you for your continued interest, Ignatius! Please visit us at http://www.example.com" } }] } }, "whatsapp_session_text_preview": { "summary": "WhatsApp: session text with URL preview, markdown, emojis, newlines", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "text": "*Thank you* for your continued interest 🤗!\n\nTo reach us:\n- _Web_: https://www.example.com\n- _Phone_: +33690909090" }, "options": { "whatsapp.text.previewUrl": "true" } }] } }, "whatsapp_session_image": { "summary": "WhatsApp: session image with markdown description", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "media": {} } }] } }, "whatsapp_session_document": { "summary": "WhatsApp: session PowerPoint file with description", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "media": {} } }] } }, "whatsapp_session_sticker": { "summary": "WhatsApp: session sticker (WebP)", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "media": {} } }] } }, "whatsapp_session_audio": { "summary": "WhatsApp: session audio", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "media": {} } }] } }, "whatsapp_session_location": { "summary": "WhatsApp: session location", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "location": {} } }] } }, "whatsapp_session_card_buttons": { "summary": "WhatsApp: session card with title, subtitle, 3 reply buttons", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "card": {} } }] } }, "whatsapp_session_card_image": { "summary": "WhatsApp: session card with image, subtitle, 2 reply buttons", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "card": {} } }] } }, "whatsapp_session_card_docx": { "summary": "WhatsApp: session card with Word document and reply button", "value": { "messages": [{ "userId": "33699999999", "channelId": "whatsapp", "content": { "card": {} } }] } }, "fallback_rcs_to_sms": { "summary": "Fallback: RCS card falling back to SMS", "value": { "messages": [{ "channelId": "rcs", "userId": "33777777777", "content": { "card": {} }, "fallback": { "channelId": "sms", "userId": "33777777777", "content": {} } }] } }, "fallback_rcs_viber_sms": { "summary": "Fallback: RCS > Viber > SMS triple chain", "value": { "messages": [{ "channelId": "rcs", "userId": "33777777777", "content": { "text": "Hello on RCS!" }, "fallback": { "channelId": "viber", "userId": "33777777777", "content": {}, "fallback": {} } }] } }, "context_batch": { "summary": "Context: batch of 2 messages with correlation IDs", "value": { "messages": [{ "channelId": "rcs", "userId": "33777777777", "content": { "text": "Test" }, "context": { "myMessageId": "1" } }, { "channelId": "rcs", "userId": "33777777777", "content": { "text": "Test" }, "context": { "myMessageId": "2" } }] } }, "context_async": { "summary": "Context: message with correlation context for async events", "value": { "messages": [{ "channelId": "sms", "userId": "33777777777", "content": { "text": "Test" }, "context": { "myUserId": "georges@example.com", "myCampaignId": "promo2020" } }] } }, "context_fallback_inherit": { "summary": "Context: fallback inherits parent context", "value": { "messages": [{ "channelId": "viber", "userId": "33777777777", "content": { "text": "Test on Viber" }, "context": { "myUserId": "georges@example.com", "myCampaignId": "promo2020" }, "fallback": { "channelId": "sms", "userId": "33777777777", "content": {} } }] } }, "context_fallback_override": { "summary": "Context: fallback overrides/merges parent context", "value": { "messages": [{ "channelId": "viber", "userId": "33777777777", "content": { "text": "Test on Viber" }, "context": { "myUserId": "georges@example.com", "myCampaignId": "promo2020", "myMessageId": "1000" }, "fallback": { "channelId": "sms", "userId": "33777777777", "content": {}, "context": {} } }] } }, "fromtemplate_sms": { "summary": "Template: send SMS from template with variables", "value": { "messages": [{ "channelId": "sms", "userId": "+33678787878", "content": { "fromTemplate": {} } }] } }, "fromtemplate_rcs_fallback_sms": { "summary": "Template: RCS from template with SMS template fallback", "value": { "messages": [{ "channelId": "rcs", "userId": "+33678787878", "content": { "fromTemplate": {} }, "fallback": { "channelId": "sms", "userId": "+33678787878", "content": {} } }] } }, "schedule_simple": { "summary": "Schedule: SMS at specific date/time with timezone", "value": { "messages": [{ "channelId": "sms", "userId": "...", "content": { "text": "..." }, "scheduleAt": "2026-02-16 08:00", "timeZone": "Europe/Zurich" }] } }, "schedule_spread": { "summary": "Schedule: WhatsApp spread over 4 hours", "value": { "messages": [{ "channelId": "whatsapp", "userId": "...", "content": { "text": "..." }, "spreadOver": "PT4H" }] } }, "schedule_spread_allowed_hours": { "summary": "Schedule: RCS spread 30 days with allowed hours and exclusions", "value": { "messages": [{ "channelId": "rcs", "userId": "...", "content": { "text": "..." }, "spreadOver": "P30D", "allowedHours": "Mo-Fr 10:00-20:00; Apr 03 off; Apr 06 off", "timeZone": "Europe/Zurich" }] } }, "schedule_dnd_fallback": { "summary": "Schedule: RCS immediate with SMS fallback with DND deferral", "value": { "messages": [{ "channelId": "rcs", "userId": "...", "content": { "text": "..." }, "fallback": { "channelId": "sms", "userId": "...", "content": {}, "whenDnd": "defer", "allowedHours": "Mo-Fr 10:00-20:00", "timeZone": "Europe/Zurich", "validFor": "P3D" } }] } }, "schedule_full": { "summary": "Schedule: full example with spread, DND, campaign, fallback", "value": { "messages": [{ "channelId": "rcs", "userId": "...", "content": { "text": "..." }, "scheduleAt": "2026-02-16 08:00", "allowedHours": "Mo-Fr 10:00-20:00", "timeZone": "Europe/Zurich", "whenDnd": "defer", "spreadOver": "P7D", "validFor": "PT2H", "campaignId": "winter holidays 2026", "fallback": { "channelId": "sms", "userId": "...", "content": {}, "allowedHours": "Mo-Fr 10:00-20:00", "timeZone": "Europe/Zurich", "whenDnd": "defer", "validFor": "P3D" } }] } } } } } }, "parameters": [] }, "GET /messages/{messageId}/schedule": { "protocol": "http", "parameters": [{ "name": "messageId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique message identifier", "x-ref": "#/components/parameters/MessageId", "index$": 0 }] }, "DELETE /messages/{messageId}/schedule": { "protocol": "http", "parameters": [{ "name": "messageId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique message identifier", "x-ref": "#/components/parameters/MessageId", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const message_ref01_ent = client.Message();
        let message_ref01_data = setup.data.new.message['message_ref01'];
        message_ref01_data = (await message_ref01_ent.create(message_ref01_data)).data();
        (0, node_assert_1.default)(null != message_ref01_data.id);
        // LOAD
        const message_ref01_match_dt0 = {};
        message_ref01_match_dt0.id = message_ref01_data.id;
        const message_ref01_data_dt0 = (await message_ref01_ent.load(message_ref01_match_dt0)).data();
        (0, node_assert_1.default)(message_ref01_data_dt0.id === message_ref01_data.id);
        // REMOVE
        const message_ref01_match_rm0 = { id: message_ref01_data.id };
        await message_ref01_ent.remove(message_ref01_match_rm0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/message/MessageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmMultichannelSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['message01', 'message02', 'message03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_MULTICHANNEL_TEST_MESSAGE_ENTID': idmap,
        'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
        'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
        'LM_MULTICHANNEL_APIKEY': '',
    });
    idmap = env['LM_MULTICHANNEL_TEST_MESSAGE_ENTID'];
    const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_MULTICHANNEL_TEST_MESSAGE_ENTID'];
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
//# sourceMappingURL=MessageEntity.test.js.map