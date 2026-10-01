

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"count":{"a":true,"h":"Count","n":"count","r":true,"sh":"Number of active schedules","t":"`$INTEGER`","key$":"count","index$":0}},"name":"schedule","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /schedules:count","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2026-02-01T10:00,2026-02-16T20:00","k":"query","n":"between","or":"between","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"campaign_id","or":"campaignId","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"Europe/Zurich","k":"query","n":"time_zone","or":"timeZone","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/schedules:count","q":{"exist":["between","campaign_id","time_zone"]},"r":{},"s":[{"lit":"schedules:count"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /schedules","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"between","or":"between","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"campaign_id","or":"campaignId","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"time_zone","or":"timeZone","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/schedules","q":{"exist":["between","campaign_id","time_zone"]},"r":{},"s":[{"lit":"schedules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"schedule","name__orig":"schedule","Name":"Schedule","name_":"schedule","name-":"schedule","NAME":"SCHEDULE","index$":4}, {"active":true,"entity":"schedule","key$":"BasicScheduleFlow","kind":"basic","name":"BasicScheduleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"schedule_ref01","srcdatavar":"schedule_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-schedule_ref01"}}],"index$":0}]}, 'Schedule', {"GET /schedules:count":{"protocol":"http","parameters":[{"name":"campaignId","in":"query","required":false,"description":"Schedule grouping identifier","schema":{"type":"string"},"index$":0},{"name":"between","in":"query","required":false,"description":"Time range as pair of ISO 8601 timestamps separated by comma (inclusive)","schema":{"type":"string"},"examples":{"default":{"value":"2026-02-01T10:00,2026-02-16T20:00"}},"index$":1},{"name":"timeZone","in":"query","required":false,"description":"IANA TZ for interpreting the between parameter","schema":{"type":"string"},"examples":{"default":{"value":"Europe/Zurich"}},"index$":2}]},"DELETE /schedules":{"protocol":"http","parameters":[{"name":"campaignId","in":"query","required":false,"description":"Schedule grouping identifier","schema":{"type":"string"},"index$":0},{"name":"between","in":"query","required":false,"description":"Time range as pair of ISO 8601 timestamps separated by comma (inclusive)","schema":{"type":"string"},"index$":1},{"name":"timeZone","in":"query","required":false,"description":"IANA TZ for interpreting the between parameter","schema":{"type":"string"},"index$":2}]}})
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
  
