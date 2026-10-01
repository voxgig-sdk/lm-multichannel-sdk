

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


describe('SelfAdminEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_MULTICHANNEL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmMultichannelSDK.test()
    const ent = testsdk.SelfAdmin()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'self_admin.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"callback":{"a":true,"h":"Callback","n":"callback","r":true,"t":"`$OBJECT`","key$":"callback","index$":0},"settings":{"a":true,"h":"Settings","n":"settings","r":true,"t":"`$OBJECT`","key$":"settings","index$":1}},"name":"self_admin","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /self/settings","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/self/settings","q":{},"r":{},"s":[{"lit":"self"},{"lit":"settings"}],"t":{"req":"`reqdata`","res":"`body.settings`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"self_admin","name__orig":"self_admin","Name":"SelfAdmin","name_":"self_admin","name-":"self-admin","NAME":"SELF_ADMIN","index$":6}, {"active":true,"entity":"self_admin","key$":"BasicSelfAdminFlow","kind":"basic","name":"BasicSelfAdminFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"self_admin_ref01","srcdatavar":"self_admin_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-self_admin_ref01"}}],"v":[],"index$":0}]}, 'SelfAdmin', {"PATCH /self/settings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["settings"],"properties":{"settings":{"type":"object","properties":{"callback":{"examples":[{}],"properties":{"auth":{},"enableCompression":{},"signatureEnabled":{},"tls":{},"url":{}},"required":["url"],"type":"object","x-ref":"#/components/schemas/CallbackSettings","key$":"callback"}},"examples":[{"callback":{"auth":{},"url":"https://acme.com"}}],"x-ref":"#/components/schemas/Settings","key$":"settings"}},"index$":1},"examples":{"updateAccountSettings":{"value":{"settings":{"callback":{"url":"https://acme.com/ocm","auth":{"type":"httpBasic","login":"someuser","password":"secret"}}}}}}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let self_admin_ref01_data = Object.values(setup.data.existing.self_admin)[0] as any

    // UPDATE
    const self_admin_ref01_ent = client.SelfAdmin()
    const self_admin_ref01_data_up0: any = {}

    const self_admin_ref01_resdata_up0 = (await self_admin_ref01_ent.update(self_admin_ref01_data_up0)).data()
    assert(null != self_admin_ref01_resdata_up0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/self_admin/SelfAdminTestData.json')

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
    ['self_admin01','self_admin02','self_admin03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_MULTICHANNEL_TEST_SELF_ADMIN_ENTID': idmap,
    'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
    'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
    'LM_MULTICHANNEL_APIKEY': '',
  })

  idmap = env['LM_MULTICHANNEL_TEST_SELF_ADMIN_ENTID']

  const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_MULTICHANNEL_TEST_SELF_ADMIN_ENTID']
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
  
