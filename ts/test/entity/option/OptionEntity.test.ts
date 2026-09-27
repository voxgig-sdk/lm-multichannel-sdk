

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


describe('OptionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_MULTICHANNEL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmMultichannelSDK.test()
    const ent = testsdk.Option()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'option.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"options":{"a":true,"h":"Options","n":"options","r":true,"t":"`$OBJECT`","key$":"options","index$":0}},"name":"option","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /templates/{templateId}/options","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"template_id","or":"template_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/templates/{templateId}/options","q":{"exist":["template_id"]},"r":{"param":{"templateId":"template_id"}},"s":[{"lit":"templates"},{"var":"template_id"},{"lit":"options"}],"t":{"req":"`reqdata`","res":"`body.options`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /templates/{templateId}/options","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"template_id","or":"template_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/templates/{templateId}/options","q":{"exist":["template_id"]},"r":{"param":{"templateId":"template_id"}},"s":[{"lit":"templates"},{"var":"template_id"},{"lit":"options"}],"t":{"req":"`reqdata`","res":"`body.options`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /templates/{templateId}/options","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"template_id","or":"template_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/templates/{templateId}/options","q":{"exist":["template_id"]},"r":{"param":{"templateId":"template_id"}},"s":[{"lit":"templates"},{"var":"template_id"},{"lit":"options"}],"t":{"req":"`reqdata`","res":"`body.options`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.template"]]},"key$":"option","name__orig":"option","Name":"Option","name_":"option","name-":"option","NAME":"OPTION","index$":3}, {"active":true,"entity":"option","key$":"BasicOptionFlow","kind":"basic","name":"BasicOptionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"option_ref01"},"m":{"template_id":"template01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"option_ref01","srcdatavar":"option_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-option_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"option_ref01","srcdatavar":"option_ref01_data","suffix":"_dt0"},"m":{"id":"option01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-option_ref01"}}],"index$":2}]}, 'Option', {"POST /templates/{templateId}/options":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["options"],"properties":{"options":{"additionalProperties":{"type":"string","key$":"additionalProperties"},"examples":[{"rcs.card.orientation":"HORIZONTAL","sms.originatingAddress":"MYBRAND"}],"key$":"options","type":"object","x-ref":"#/components/schemas/StringStringMap","index$":0}},"examples":[{"options":{"rcs.card.orientation":"HORIZONTAL","rcs.media.height":"TALL"}}],"x-ref":"#/components/schemas/OptionsWrapper","index$":1}}}},"parameters":[{"name":"templateId","in":"path","required":true,"schema":{"type":"string"},"description":"Unique template identifier","x-ref":"#/components/parameters/TemplateId","index$":0}]},"GET /templates/{templateId}/options":{"protocol":"http","parameters":[{"name":"templateId","in":"path","required":true,"schema":{"type":"string"},"description":"Unique template identifier","x-ref":"#/components/parameters/TemplateId","index$":0}]},"PATCH /templates/{templateId}/options":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["options"],"properties":{"options":{"additionalProperties":{"type":"string","key$":"additionalProperties"},"examples":[{"rcs.card.orientation":"HORIZONTAL","sms.originatingAddress":"MYBRAND"}],"key$":"options","type":"object","x-ref":"#/components/schemas/StringStringMap","index$":0}},"examples":[{"options":{"rcs.card.orientation":"HORIZONTAL","rcs.media.height":"TALL"}}],"x-ref":"#/components/schemas/OptionsWrapper","index$":1}}}},"parameters":[{"name":"templateId","in":"path","required":true,"schema":{"type":"string"},"description":"Unique template identifier","x-ref":"#/components/parameters/TemplateId","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const option_ref01_ent = client.Option()
    let option_ref01_data = setup.data.new.option['option_ref01']
    option_ref01_data['template_id'] = setup.idmap['template01']

    option_ref01_data = (await option_ref01_ent.create(option_ref01_data)).data()
    assert(null != option_ref01_data)


    // UPDATE
    const option_ref01_data_up0: any = {}

    const option_ref01_resdata_up0 = (await option_ref01_ent.update(option_ref01_data_up0)).data()
    assert(null != option_ref01_resdata_up0)



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/option/OptionTestData.json')

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
    ['option01','option02','option03','template01','template02','template03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_MULTICHANNEL_TEST_OPTION_ENTID': idmap,
    'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
    'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
    'LM_MULTICHANNEL_APIKEY': '',
  })

  idmap = env['LM_MULTICHANNEL_TEST_OPTION_ENTID']

  const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_MULTICHANNEL_TEST_OPTION_ENTID']
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
  
