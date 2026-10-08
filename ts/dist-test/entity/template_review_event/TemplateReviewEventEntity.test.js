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
(0, node_test_1.describe)('TemplateReviewEventEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_MULTICHANNEL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmMultichannelSDK.test();
        const ent = testsdk.TemplateReviewEvent();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.LmMultichannelSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.TemplateReviewEvent().list({ "review_id": 1, "template_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'template_review_event.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accountId": { "a": true, "h": "Account Id", "n": "accountId", "r": true, "sh": "Account identifier", "t": "`$STRING`", "key$": "accountId", "index$": 0 }, "eventId": { "a": true, "h": "Event Id", "n": "eventId", "r": true, "sh": "Unique event identifier (for idempotent processing / deduplication)", "t": "`$STRING`", "key$": "eventId", "index$": 1 }, "messageStatusChanged": { "a": true, "h": "Message Status Changed", "n": "messageStatusChanged", "r": true, "t": "`$OBJECT`", "key$": "messageStatusChanged", "index$": 2 }, "on": { "a": true, "fo": "date-time", "h": "On", "n": "on", "r": true, "sh": "UTC date-time when the event occurred", "t": "`$STRING`", "key$": "on", "index$": 3 }, "templateReviewStatusChanged": { "a": true, "h": "Template Review Status Changed", "n": "templateReviewStatusChanged", "r": true, "t": "`$OBJECT`", "key$": "templateReviewStatusChanged", "index$": 4 }, "userMessageReceived": { "a": true, "h": "User Message Received", "n": "userMessageReceived", "r": true, "t": "`$OBJECT`", "key$": "userMessageReceived", "index$": 5 } }, "name": "template_review_event", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /templates/{templateId}/reviews/{channelId}/events", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "review_id", "or": "channelId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "template_id", "or": "templateId", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "page_index", "or": "_pageIndex", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "page_size", "or": "_pageSize", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "desc:on", "k": "query", "n": "sort", "or": "_sort", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/templates/{templateId}/reviews/{channelId}/events", "q": { "exist": ["review_id", "template_id"] }, "r": { "param": { "channelId": "review_id", "templateId": "template_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "templates" }, { "var": "template_id" }, { "lit": "reviews" }, { "var": "review_id" }, { "lit": "events" }], "t": { "req": "`reqdata`", "res": "`body.events`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.template"]] }, "key$": "template_review_event", "name__orig": "template_review_event", "Name": "TemplateReviewEvent", "name_": "template_review_event", "name-": "template-review-event", "NAME": "TEMPLATE_REVIEW_EVENT", "index$": 8 }, { "active": true, "entity": "template_review_event", "key$": "BasicTemplateReviewEventFlow", "kind": "basic", "name": "BasicTemplateReviewEventFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "review_id": "review01", "template_id": "template01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "template_review_event_ref01" } }], "index$": 0 }] }, 'TemplateReviewEvent', { "GET /templates/{templateId}/reviews/{channelId}/events": { "protocol": "http", "parameters": [{ "name": "templateId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Unique template identifier", "x-ref": "#/components/parameters/TemplateId", "index$": 0 }, { "name": "channelId", "in": "path", "required": true, "schema": { "type": "string", "enum": ["sms", "rcs", "viber", "whatsapp", "mock"] }, "description": "Channel identifier", "x-ref": "#/components/parameters/ChannelId", "index$": 1 }, { "name": "_pageSize", "in": "query", "required": false, "schema": { "type": "integer" }, "description": "Page size for pagination", "x-ref": "#/components/parameters/PageSize", "index$": 2 }, { "name": "_pageIndex", "in": "query", "required": false, "schema": { "type": "integer" }, "description": "Zero-based page index", "x-ref": "#/components/parameters/PageIndex", "index$": 3 }, { "name": "_sort", "in": "query", "required": false, "description": "Sort by property paths with optional asc:/desc: prefix", "schema": { "type": "string" }, "examples": { "newest_first": { "summary": "Newest events first", "value": "desc:on" } }, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let template_review_event_ref01_data = Object.values(setup.data.existing.template_review_event)[0];
        // LIST
        const template_review_event_ref01_ent = client.TemplateReviewEvent();
        const template_review_event_ref01_match = {};
        template_review_event_ref01_match['review_id'] = setup.idmap['review01'];
        template_review_event_ref01_match['template_id'] = setup.idmap['template01'];
        const template_review_event_ref01_list = (await template_review_event_ref01_ent.list(template_review_event_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/template_review_event/TemplateReviewEventTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmMultichannelSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['template_review_event01', 'template_review_event02', 'template_review_event03', 'template01', 'template02', 'template03', 'review01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_MULTICHANNEL_TEST_TEMPLATE_REVIEW_EVENT_ENTID': idmap,
        'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
        'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
        'LM_MULTICHANNEL_APIKEY': '',
    });
    idmap = env['LM_MULTICHANNEL_TEST_TEMPLATE_REVIEW_EVENT_ENTID'];
    const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_MULTICHANNEL_TEST_TEMPLATE_REVIEW_EVENT_ENTID'];
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
//# sourceMappingURL=TemplateReviewEventEntity.test.js.map