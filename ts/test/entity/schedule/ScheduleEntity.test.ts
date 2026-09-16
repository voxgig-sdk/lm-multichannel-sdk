

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LmMultichannelSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ScheduleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_MULTICHANNEL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmMultichannelSDK.test()
    const ent = testsdk.Schedule()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'schedule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"count","req":true,"short":"Number of active schedules","type":"`$INTEGER`","index$":0}],"name":"schedule","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"2026-02-01T10:00,2026-02-16T20:00","kind":"query","name":"between","orig":"between","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"campaign_id","orig":"campaign_id","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"Europe/Zurich","kind":"query","name":"time_zone","orig":"time_zone","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /schedules:count","json":"{\"operationId\":\"getScheduleCount\",\"parameters\":[{\"description\":\"Schedule grouping identifier\",\"in\":\"query\",\"name\":\"campaignId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Time range as pair of ISO 8601 timestamps separated by comma (inclusive)\",\"examples\":{\"default\":{\"value\":\"2026-02-01T10:00,2026-02-16T20:00\"}},\"in\":\"query\",\"name\":\"between\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"IANA TZ for interpreting the between parameter\",\"examples\":{\"default\":{\"value\":\"Europe/Zurich\"}},\"in\":\"query\",\"name\":\"timeZone\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"Number of active schedules\",\"type\":\"integer\"}},\"required\":[\"count\"],\"type\":\"object\"}}},\"description\":\"Count returned\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/schedules:count","segments":[{"lit":"schedules:count"}],"select":{"exist":["between","campaign_id","time_zone"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"between","orig":"between","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"campaign_id","orig":"campaign_id","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"time_zone","orig":"time_zone","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"DELETE /schedules","json":"{\"operationId\":\"bulkDeleteSchedules\",\"parameters\":[{\"description\":\"Schedule grouping identifier\",\"in\":\"query\",\"name\":\"campaignId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Time range as pair of ISO 8601 timestamps separated by comma (inclusive)\",\"in\":\"query\",\"name\":\"between\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"IANA TZ for interpreting the between parameter\",\"in\":\"query\",\"name\":\"timeZone\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"202\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"Number of schedules at the moment deletion was requested\",\"type\":\"integer\"}},\"required\":[\"count\"],\"type\":\"object\"}}},\"description\":\"Deletion initiated\"},\"409\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Another bulk deletion is already in progress\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/schedules","segments":[{"lit":"schedules"}],"select":{"exist":["between","campaign_id","time_zone"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"schedule","name__orig":"schedule","Name":"Schedule","name_":"schedule","name-":"schedule","NAME":"SCHEDULE","index$":4}, {"active":true,"entity":"schedule","key$":"BasicScheduleFlow","kind":"basic","name":"BasicScheduleFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"schedule_ref01","srcdatavar":"schedule_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-schedule_ref01"}}],"index$":0}]}, 'Schedule')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let schedule_ref01_data = Object.values(setup.data.existing.schedule)[0] as any

    // LOAD
    const schedule_ref01_ent = client.Schedule()
    const schedule_ref01_match_dt0: any = {}
    const schedule_ref01_data_dt0 = (await schedule_ref01_ent.load(schedule_ref01_match_dt0)).data()
    assert(null != schedule_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/schedule/ScheduleTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LmMultichannelSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['schedule01','schedule02','schedule03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_MULTICHANNEL_TEST_SCHEDULE_ENTID': idmap,
    'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
    'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
    'LM_MULTICHANNEL_APIKEY': '',
  })

  idmap = env['LM_MULTICHANNEL_TEST_SCHEDULE_ENTID']

  const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_MULTICHANNEL_TEST_SCHEDULE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LmMultichannelSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
