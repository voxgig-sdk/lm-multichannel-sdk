

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


describe('TrafficFileEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_MULTICHANNEL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmMultichannelSDK.test()
    const ent = testsdk.TrafficFile()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'traffic_file.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"files":{"a":true,"h":"Files","n":"files","r":true,"t":"`$ARRAY`","key$":"files","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"path":{"a":true,"h":"Path","n":"path","r":true,"sh":"Relative file path: /events/{year}/{month}/{day}/{hour}/{sequence}.zip","t":"`$STRING`","key$":"path","index$":2},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"Absolute download URL with security token (expires after 15 minutes)","t":"`$STRING`","key$":"url","index$":3}},"id":{"field":"id","name":"id"},"name":"traffic_file","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /traffic/files","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/traffic/files","q":{},"r":{},"s":[{"lit":"traffic"},{"lit":"files"}],"t":{"req":"`reqdata`","res":"`body.files`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /traffic/files/{path}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"path","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/traffic/files/{path}","q":{"exist":["id"]},"r":{"param":{"path":"id"}},"s":[{"lit":"traffic"},{"lit":"files"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"traffic_file","name__orig":"traffic_file","Name":"TrafficFile","name_":"traffic_file","name-":"traffic-file","NAME":"TRAFFIC_FILE","index$":9}, {"active":true,"entity":"traffic_file","key$":"BasicTrafficFileFlow","kind":"basic","name":"BasicTrafficFileFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"traffic_file_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"traffic_file_ref01","srcdatavar":"traffic_file_ref01_data","suffix":"_dt0"},"m":{"id":"traffic_file01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-traffic_file_ref01"}}],"index$":1}]}, 'TrafficFile', {"GET /traffic/files":{"protocol":"http","parameters":[]},"GET /traffic/files/{path}":{"protocol":"http","parameters":[{"name":"path","in":"path","required":true,"description":"Relative folder path (e.g. events/2024 or events/2024/11/10/09) or file path for DELETE","schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let traffic_file_ref01_data = Object.values(setup.data.existing.traffic_file)[0] as any

    // LIST
    const traffic_file_ref01_ent = client.TrafficFile()
    const traffic_file_ref01_match: any = {}

    const traffic_file_ref01_list = (await traffic_file_ref01_ent.list(traffic_file_ref01_match)).map((e: any) => e.data())


    // LOAD
    const traffic_file_ref01_match_dt0: any = {}
    traffic_file_ref01_match_dt0.id = traffic_file_ref01_data.id
    const traffic_file_ref01_data_dt0 = (await traffic_file_ref01_ent.load(traffic_file_ref01_match_dt0)).data()
    assert(traffic_file_ref01_data_dt0.id === traffic_file_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/traffic_file/TrafficFileTestData.json')

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
    ['traffic_file01','traffic_file02','traffic_file03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID': idmap,
    'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
    'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
    'LM_MULTICHANNEL_APIKEY': '',
  })

  idmap = env['LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID']

  const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_MULTICHANNEL_TEST_TRAFFIC_FILE_ENTID']
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
  
