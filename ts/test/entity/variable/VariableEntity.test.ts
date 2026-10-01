

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


describe('VariableEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_MULTICHANNEL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmMultichannelSDK.test()
    const ent = testsdk.Variable()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE
    for (const op of ['create', 'list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'variable.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Variable description","t":"`$STRING`","key$":"description","index$":0},"examples":{"a":true,"h":"Examples","n":"examples","r":false,"sh":"Example values","t":"`$ARRAY`","key$":"examples","index$":1},"formats":{"a":true,"h":"Formats","n":"formats","r":false,"sh":"Type-specific constraint formats (e.g.","t":"`$ARRAY`","key$":"formats","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)","t":"`$STRING`","key$":"name","index$":3},"ref":{"a":true,"h":"Ref","n":"ref","r":false,"sh":"Optional immutable identifier for the variable (used for merge identity)","t":"`$STRING`","key$":"ref","index$":4},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Optional type descriptor for validation constraints","t":"`$STRING`","key$":"type","index$":5},"variables":{"a":true,"h":"Variables","n":"variables","r":true,"t":"`$ARRAY`","key$":"variables","index$":6}},"name":"variable","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /templates/{templateId}/variables","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"template_id","or":"templateId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/templates/{templateId}/variables","q":{"exist":["template_id"]},"r":{"param":{"templateId":"template_id"}},"s":[{"lit":"templates"},{"var":"template_id"},{"lit":"variables"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /templates/{templateId}/variables","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"template_id","or":"templateId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/templates/{templateId}/variables","q":{"exist":["template_id"]},"r":{"param":{"templateId":"template_id"}},"s":[{"lit":"templates"},{"var":"template_id"},{"lit":"variables"}],"t":{"req":"`reqdata`","res":"`body.variables`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /templates/{templateId}/variables","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"template_id","or":"templateId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/templates/{templateId}/variables","q":{"exist":["template_id"]},"r":{"param":{"templateId":"template_id"}},"s":[{"lit":"templates"},{"var":"template_id"},{"lit":"variables"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.template"]]},"key$":"variable","name__orig":"variable","Name":"Variable","name_":"variable","name-":"variable","NAME":"VARIABLE","index$":11}, {"active":true,"entity":"variable","key$":"BasicVariableFlow","kind":"basic","name":"BasicVariableFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"variable_ref01"},"m":{"template_id":"template01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"template_id":"template01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"variable_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"variable_ref01","srcdatavar":"variable_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-variable_ref01"}}],"v":[],"index$":2}]}, 'Variable', {"POST /templates/{templateId}/variables":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["variables"],"properties":{"variables":{"items":{"examples":[{"description":"Customer first name","examples":[],"formats":[],"name":"firstName","ref":"MY_FIELD_1","type":"text"}],"properties":{"description":{"description":"Variable description","type":"string","key$":"description"},"examples":{"description":"Example values","items":{},"type":"array","key$":"examples"},"formats":{"description":"Type-specific constraint formats (e.g. culture codes, regex patterns)","items":{},"type":"array","key$":"formats"},"name":{"description":"Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)","type":"string","key$":"name"},"ref":{"description":"Optional immutable identifier for the variable (used for merge identity)","maxLength":50,"type":"string","key$":"ref"},"type":{"description":"Optional type descriptor for validation constraints","enum":[],"type":"string","key$":"type"}},"required":["name"],"type":"object","x-ref":"#/components/schemas/Variable","index$":0},"key$":"variables","type":"array"}},"examples":[{"variables":[{"name":"firstName"},{"name":"lastName","description":"Family name"}]}],"x-ref":"#/components/schemas/VariablesWrapper","index$":1}}}},"parameters":[{"name":"templateId","in":"path","required":true,"schema":{"type":"string"},"description":"Unique template identifier","x-ref":"#/components/parameters/TemplateId","index$":0}]},"GET /templates/{templateId}/variables":{"protocol":"http","parameters":[{"name":"templateId","in":"path","required":true,"schema":{"type":"string"},"description":"Unique template identifier","x-ref":"#/components/parameters/TemplateId","index$":0}]},"PATCH /templates/{templateId}/variables":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["variables"],"properties":{"variables":{"items":{"examples":[{"description":"Customer first name","examples":[],"formats":[],"name":"firstName","ref":"MY_FIELD_1","type":"text"}],"properties":{"description":{"description":"Variable description","type":"string","key$":"description"},"examples":{"description":"Example values","items":{},"type":"array","key$":"examples"},"formats":{"description":"Type-specific constraint formats (e.g. culture codes, regex patterns)","items":{},"type":"array","key$":"formats"},"name":{"description":"Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)","type":"string","key$":"name"},"ref":{"description":"Optional immutable identifier for the variable (used for merge identity)","maxLength":50,"type":"string","key$":"ref"},"type":{"description":"Optional type descriptor for validation constraints","enum":[],"type":"string","key$":"type"}},"required":["name"],"type":"object","x-ref":"#/components/schemas/Variable","index$":0},"key$":"variables","type":"array"}},"examples":[{"variables":[{"name":"firstName"},{"name":"lastName","description":"Family name"}]}],"x-ref":"#/components/schemas/VariablesWrapper","index$":1}}}},"parameters":[{"name":"templateId","in":"path","required":true,"schema":{"type":"string"},"description":"Unique template identifier","x-ref":"#/components/parameters/TemplateId","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const variable_ref01_ent = client.Variable()
    let variable_ref01_data = setup.data.new.variable['variable_ref01']
    variable_ref01_data['template_id'] = setup.idmap['template01']

    variable_ref01_data = (await variable_ref01_ent.create(variable_ref01_data)).data()
    assert(null != variable_ref01_data)


    // LIST
    const variable_ref01_match: any = {}
    variable_ref01_match['template_id'] = setup.idmap['template01']

    const variable_ref01_list = (await variable_ref01_ent.list(variable_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const variable_ref01_data_up0: any = {}

    const variable_ref01_markdef_up0 = { name: 'description', value: 'Mark01-variable_ref01_' + setup.now }
    ;(variable_ref01_data_up0 as any)[variable_ref01_markdef_up0.name] = variable_ref01_markdef_up0.value

    const variable_ref01_resdata_up0 = (await variable_ref01_ent.update(variable_ref01_data_up0)).data()
    assert(null != variable_ref01_resdata_up0)

    assert((variable_ref01_resdata_up0 as any)[variable_ref01_markdef_up0.name] === variable_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/variable/VariableTestData.json')

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
    ['variable01','variable02','variable03','template01','template02','template03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_MULTICHANNEL_TEST_VARIABLE_ENTID': idmap,
    'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
    'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
    'LM_MULTICHANNEL_APIKEY': '',
  })

  idmap = env['LM_MULTICHANNEL_TEST_VARIABLE_ENTID']

  const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_MULTICHANNEL_TEST_VARIABLE_ENTID']
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
  
