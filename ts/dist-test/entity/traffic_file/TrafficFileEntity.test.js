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
(0, node_test_1.describe)('TrafficFileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_MULTICHANNEL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmMultichannelSDK.test();
        const ent = testsdk.TrafficFile();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'traffic_file.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "files", "req": true, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "path", "req": true, "short": "Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "url", "req": true, "short": "Absolute download URL with security token (expires after 15 minutes)", "type": "`$STRING`", "index$": 3 }], "id": { "field": "id", "name": "id" }, "name": "traffic_file", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /traffic/files", "json": "{\"operationId\":\"listTrafficFilesRoot\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"files\":[{\"path\":\"/events/2024/11/03/15/xxx.zip\",\"url\":\"https://ocp-traffic-files-....s3...\"},{\"path\":\"/events/2024/11/04/15/yyy.zip\",\"url\":\"https://ocp-traffic-files-....s3...\"},{\"path\":\"/events/2024/11/04/16/zzz.zip\",\"url\":\"https://ocp-traffic-files-....s3...\"}]}],\"properties\":{\"files\":{\"items\":{\"examples\":[{\"path\":\"/events/2024/11/04/15/events-1-2024-11-04-15-11-05-567b90ac.zip\",\"url\":\"https://ocp-traffic-files-544418618271.s3.eu-central-1.amazonaws.com/events/2024/11/06/14/events-1-...zip?...\"}],\"properties\":{\"path\":{\"description\":\"Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip\",\"type\":\"string\"},\"url\":{\"description\":\"Absolute download URL with security token (expires after 15 minutes)\",\"type\":\"string\"}},\"required\":[\"path\",\"url\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"files\"],\"type\":\"object\"}}},\"description\":\"Files listed\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/traffic/files", "segments": [{ "lit": "traffic" }, { "lit": "files" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.files`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "path", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /traffic/files/{path}", "json": "{\"operationId\":\"listTrafficFilesInFolder\",\"parameters\":[{\"description\":\"Relative folder path (e.g. events/2024 or events/2024/11/10/09) or file path for DELETE\",\"in\":\"path\",\"name\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"files\":[{\"path\":\"/events/2024/11/03/15/xxx.zip\",\"url\":\"https://ocp-traffic-files-....s3...\"},{\"path\":\"/events/2024/11/04/15/yyy.zip\",\"url\":\"https://ocp-traffic-files-....s3...\"},{\"path\":\"/events/2024/11/04/16/zzz.zip\",\"url\":\"https://ocp-traffic-files-....s3...\"}]}],\"properties\":{\"files\":{\"items\":{\"examples\":[{\"path\":\"/events/2024/11/04/15/events-1-2024-11-04-15-11-05-567b90ac.zip\",\"url\":\"https://ocp-traffic-files-544418618271.s3.eu-central-1.amazonaws.com/events/2024/11/06/14/events-1-...zip?...\"}],\"properties\":{\"path\":{\"description\":\"Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip\",\"type\":\"string\"},\"url\":{\"description\":\"Absolute download URL with security token (expires after 15 minutes)\",\"type\":\"string\"}},\"required\":[\"path\",\"url\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"files\"],\"type\":\"object\"}}},\"description\":\"Files listed\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/traffic/files/{path}", "rename": { "param": { "path": "id" } }, "segments": [{ "lit": "traffic" }, { "lit": "files" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "traffic_file", "name__orig": "traffic_file", "Name": "TrafficFile", "name_": "traffic_file", "name-": "traffic-file", "NAME": "TRAFFIC_FILE", "index$": 9 }, { "active": true, "entity": "traffic_file", "key$": "BasicTrafficFileFlow", "kind": "basic", "name": "BasicTrafficFileFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "traffic_file_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "traffic_file_ref01", "srcdatavar": "traffic_file_ref01_data", "suffix": "_dt0" }, "match": { "id": "traffic_file01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-traffic_file_ref01" } }], "index$": 1 }] }, 'TrafficFile');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let traffic_file_ref01_data = Object.values(setup.data.existing.traffic_file)[0];
        // LIST
        const traffic_file_ref01_ent = client.TrafficFile();
        const traffic_file_ref01_match = {};
        const traffic_file_ref01_list = (await traffic_file_ref01_ent.list(traffic_file_ref01_match)).map((e) => e.data());
        // LOAD
        const traffic_file_ref01_match_dt0 = {};
        traffic_file_ref01_match_dt0.id = traffic_file_ref01_data.id;
        const traffic_file_ref01_data_dt0 = (await traffic_file_ref01_ent.load(traffic_file_ref01_match_dt0)).data();
        (0, node_assert_1.default)(traffic_file_ref01_data_dt0.id === traffic_file_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/traffic_file/TrafficFileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmMultichannelSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['traffic_file01', 'traffic_file02', 'traffic_file03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID': idmap,
        'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
        'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
        'LM_MULTICHANNEL_APIKEY': '',
    });
    idmap = env['LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID'];
    const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID'];
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
//# sourceMappingURL=TrafficFileEntity.test.js.map