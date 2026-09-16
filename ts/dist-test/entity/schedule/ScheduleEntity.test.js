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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ScheduleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_MULTICHANNEL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmMultichannelSDK.test();
        const ent = testsdk.Schedule();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'schedule.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "count", "req": true, "short": "Number of active schedules", "type": "`$INTEGER`", "index$": 0 }], "name": "schedule", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "2026-02-01T10:00,2026-02-16T20:00", "kind": "query", "name": "between", "orig": "between", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "campaign_id", "orig": "campaign_id", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "Europe/Zurich", "kind": "query", "name": "time_zone", "orig": "time_zone", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /schedules:count", "json": "{\"operationId\":\"getScheduleCount\",\"parameters\":[{\"description\":\"Schedule grouping identifier\",\"in\":\"query\",\"name\":\"campaignId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Time range as pair of ISO 8601 timestamps separated by comma (inclusive)\",\"examples\":{\"default\":{\"value\":\"2026-02-01T10:00,2026-02-16T20:00\"}},\"in\":\"query\",\"name\":\"between\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"IANA TZ for interpreting the between parameter\",\"examples\":{\"default\":{\"value\":\"Europe/Zurich\"}},\"in\":\"query\",\"name\":\"timeZone\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"Number of active schedules\",\"type\":\"integer\"}},\"required\":[\"count\"],\"type\":\"object\"}}},\"description\":\"Count returned\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/schedules:count", "segments": [{ "lit": "schedules:count" }], "select": { "exist": ["between", "campaign_id", "time_zone"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "between", "orig": "between", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "campaign_id", "orig": "campaign_id", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "time_zone", "orig": "time_zone", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "DELETE /schedules", "json": "{\"operationId\":\"bulkDeleteSchedules\",\"parameters\":[{\"description\":\"Schedule grouping identifier\",\"in\":\"query\",\"name\":\"campaignId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Time range as pair of ISO 8601 timestamps separated by comma (inclusive)\",\"in\":\"query\",\"name\":\"between\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"IANA TZ for interpreting the between parameter\",\"in\":\"query\",\"name\":\"timeZone\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"202\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"Number of schedules at the moment deletion was requested\",\"type\":\"integer\"}},\"required\":[\"count\"],\"type\":\"object\"}}},\"description\":\"Deletion initiated\"},\"409\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Another bulk deletion is already in progress\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/schedules", "segments": [{ "lit": "schedules" }], "select": { "exist": ["between", "campaign_id", "time_zone"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "schedule", "name__orig": "schedule", "Name": "Schedule", "name_": "schedule", "name-": "schedule", "NAME": "SCHEDULE", "index$": 4 }, { "active": true, "entity": "schedule", "key$": "BasicScheduleFlow", "kind": "basic", "name": "BasicScheduleFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "schedule_ref01", "srcdatavar": "schedule_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-schedule_ref01" } }], "index$": 0 }] }, 'Schedule');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let schedule_ref01_data = Object.values(setup.data.existing.schedule)[0];
        // LOAD
        const schedule_ref01_ent = client.Schedule();
        const schedule_ref01_match_dt0 = {};
        const schedule_ref01_data_dt0 = (await schedule_ref01_ent.load(schedule_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != schedule_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/schedule/ScheduleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmMultichannelSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['schedule01', 'schedule02', 'schedule03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_MULTICHANNEL_TEST_SCHEDULE_ENTID': idmap,
        'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
        'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
        'LM_MULTICHANNEL_APIKEY': '',
    });
    idmap = env['LM_MULTICHANNEL_TEST_SCHEDULE_ENTID'];
    const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_MULTICHANNEL_TEST_SCHEDULE_ENTID'];
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
//# sourceMappingURL=ScheduleEntity.test.js.map