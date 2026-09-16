

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"options","req":true,"type":"`$OBJECT`","index$":0}],"name":"option","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"template_id","orig":"template_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /templates/{templateId}/options","json":"{\"operationId\":\"overwriteTemplateOptions\",\"parameters\":[{\"description\":\"Unique template identifier\",\"in\":\"path\",\"name\":\"templateId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"options\":{\"rcs.card.orientation\":\"HORIZONTAL\",\"rcs.media.height\":\"TALL\"}}],\"properties\":{\"options\":{\"additionalProperties\":{\"type\":\"string\"},\"examples\":[{\"rcs.card.orientation\":\"HORIZONTAL\",\"sms.originatingAddress\":\"MYBRAND\"}],\"type\":\"object\"}},\"required\":[\"options\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"options\":{\"rcs.card.orientation\":\"HORIZONTAL\",\"rcs.media.height\":\"TALL\"}}],\"properties\":{\"options\":{\"additionalProperties\":{\"type\":\"string\"},\"examples\":[{\"rcs.card.orientation\":\"HORIZONTAL\",\"sms.originatingAddress\":\"MYBRAND\"}],\"type\":\"object\"}},\"required\":[\"options\"],\"type\":\"object\"}}},\"description\":\"Options updated\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Authorization failed\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"423\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Template is locked for editing (active review with SUBMITTING, SUBMITTED or APPROVED status)\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/templates/{templateId}/options","rename":{"param":{"templateId":"template_id"}},"segments":[{"lit":"templates"},{"var":"template_id"},{"lit":"options"}],"select":{"exist":["template_id"]},"transform":{"req":"`reqdata`","res":"`body.options`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"template_id","orig":"template_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /templates/{templateId}/options","json":"{\"operationId\":\"getTemplateOptions\",\"parameters\":[{\"description\":\"Unique template identifier\",\"in\":\"path\",\"name\":\"templateId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"options\":{\"rcs.card.orientation\":\"HORIZONTAL\",\"rcs.media.height\":\"TALL\"}}],\"properties\":{\"options\":{\"additionalProperties\":{\"type\":\"string\"},\"examples\":[{\"rcs.card.orientation\":\"HORIZONTAL\",\"sms.originatingAddress\":\"MYBRAND\"}],\"type\":\"object\"}},\"required\":[\"options\"],\"type\":\"object\"}}},\"description\":\"Options returned\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/templates/{templateId}/options","rename":{"param":{"templateId":"template_id"}},"segments":[{"lit":"templates"},{"var":"template_id"},{"lit":"options"}],"select":{"exist":["template_id"]},"transform":{"req":"`reqdata`","res":"`body.options`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"template_id","orig":"template_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PATCH /templates/{templateId}/options","json":"{\"operationId\":\"mergeTemplateOptions\",\"parameters\":[{\"description\":\"Unique template identifier\",\"in\":\"path\",\"name\":\"templateId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"options\":{\"rcs.card.orientation\":\"HORIZONTAL\",\"rcs.media.height\":\"TALL\"}}],\"properties\":{\"options\":{\"additionalProperties\":{\"type\":\"string\"},\"examples\":[{\"rcs.card.orientation\":\"HORIZONTAL\",\"sms.originatingAddress\":\"MYBRAND\"}],\"type\":\"object\"}},\"required\":[\"options\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"options\":{\"rcs.card.orientation\":\"HORIZONTAL\",\"rcs.media.height\":\"TALL\"}}],\"properties\":{\"options\":{\"additionalProperties\":{\"type\":\"string\"},\"examples\":[{\"rcs.card.orientation\":\"HORIZONTAL\",\"sms.originatingAddress\":\"MYBRAND\"}],\"type\":\"object\"}},\"required\":[\"options\"],\"type\":\"object\"}}},\"description\":\"Options updated\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Authorization failed\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"423\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Template is locked for editing (active review with SUBMITTING, SUBMITTED or APPROVED status)\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/templates/{templateId}/options","rename":{"param":{"templateId":"template_id"}},"segments":[{"lit":"templates"},{"var":"template_id"},{"lit":"options"}],"select":{"exist":["template_id"]},"transform":{"req":"`reqdata`","res":"`body.options`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["template"]]},"key$":"option","name__orig":"option","Name":"Option","name_":"option","name-":"option","NAME":"OPTION","index$":3}, {"active":true,"entity":"option","key$":"BasicOptionFlow","kind":"basic","name":"BasicOptionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"option_ref01"},"match":{"template_id":"template01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"option_ref01","srcdatavar":"option_ref01_data","suffix":"_up0"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-option_ref01"}}],"valid":[],"index$":1},{"active":true,"data":{},"input":{"ref":"option_ref01","srcdatavar":"option_ref01_data","suffix":"_dt0"},"match":{"id":"option01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-option_ref01"}}],"index$":2}]}, 'Option')
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
  
