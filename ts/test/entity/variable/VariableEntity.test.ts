

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"Variable description","type":"`$STRING`","index$":0},{"active":true,"name":"examples","req":false,"short":"Example values","type":"`$ARRAY`","index$":1},{"active":true,"name":"formats","req":false,"short":"Type-specific constraint formats (e.g.","type":"`$ARRAY`","index$":2},{"active":true,"name":"name","req":true,"short":"Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)","type":"`$STRING`","index$":3},{"active":true,"name":"ref","req":false,"short":"Optional immutable identifier for the variable (used for merge identity)","type":"`$STRING`","index$":4},{"active":true,"name":"type","req":false,"short":"Optional type descriptor for validation constraints","type":"`$STRING`","index$":5},{"active":true,"name":"variables","req":true,"type":"`$ARRAY`","index$":6}],"name":"variable","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"template_id","orig":"template_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /templates/{templateId}/variables","json":"{\"operationId\":\"overwriteTemplateVariables\",\"parameters\":[{\"description\":\"Unique template identifier\",\"in\":\"path\",\"name\":\"templateId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"variables\":[{\"name\":\"firstName\"},{\"description\":\"Family name\",\"name\":\"lastName\"}]}],\"properties\":{\"variables\":{\"items\":{\"examples\":[{\"description\":\"Customer first name\",\"examples\":[\"Georges\",\"Alice\"],\"formats\":[\"unicode\"],\"name\":\"firstName\",\"ref\":\"MY_FIELD_1\",\"type\":\"text\"}],\"properties\":{\"description\":{\"description\":\"Variable description\",\"type\":\"string\"},\"examples\":{\"description\":\"Example values\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"formats\":{\"description\":\"Type-specific constraint formats (e.g. culture codes, regex patterns)\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)\",\"type\":\"string\"},\"ref\":{\"description\":\"Optional immutable identifier for the variable (used for merge identity)\",\"maxLength\":50,\"type\":\"string\"},\"type\":{\"description\":\"Optional type descriptor for validation constraints\",\"enum\":[\"text\",\"dateTime\",\"number\",\"phoneNumber\",\"url\",\"emailAddress\",\"custom\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"variables\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"variables\":[{\"name\":\"firstName\"},{\"description\":\"Family name\",\"name\":\"lastName\"}]}],\"properties\":{\"variables\":{\"items\":{\"examples\":[{\"description\":\"Customer first name\",\"examples\":[\"Georges\",\"Alice\"],\"formats\":[\"unicode\"],\"name\":\"firstName\",\"ref\":\"MY_FIELD_1\",\"type\":\"text\"}],\"properties\":{\"description\":{\"description\":\"Variable description\",\"type\":\"string\"},\"examples\":{\"description\":\"Example values\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"formats\":{\"description\":\"Type-specific constraint formats (e.g. culture codes, regex patterns)\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)\",\"type\":\"string\"},\"ref\":{\"description\":\"Optional immutable identifier for the variable (used for merge identity)\",\"maxLength\":50,\"type\":\"string\"},\"type\":{\"description\":\"Optional type descriptor for validation constraints\",\"enum\":[\"text\",\"dateTime\",\"number\",\"phoneNumber\",\"url\",\"emailAddress\",\"custom\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"variables\"],\"type\":\"object\"}}},\"description\":\"Variables updated\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Authorization failed\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"423\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Template is locked for editing (active review with SUBMITTING, SUBMITTED or APPROVED status)\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/templates/{templateId}/variables","rename":{"param":{"templateId":"template_id"}},"segments":[{"lit":"templates"},{"var":"template_id"},{"lit":"variables"}],"select":{"exist":["template_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"template_id","orig":"template_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /templates/{templateId}/variables","json":"{\"operationId\":\"getTemplateVariables\",\"parameters\":[{\"description\":\"Unique template identifier\",\"in\":\"path\",\"name\":\"templateId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"variables\":[{\"name\":\"firstName\"},{\"description\":\"Family name\",\"name\":\"lastName\"}]}],\"properties\":{\"variables\":{\"items\":{\"examples\":[{\"description\":\"Customer first name\",\"examples\":[\"Georges\",\"Alice\"],\"formats\":[\"unicode\"],\"name\":\"firstName\",\"ref\":\"MY_FIELD_1\",\"type\":\"text\"}],\"properties\":{\"description\":{\"description\":\"Variable description\",\"type\":\"string\"},\"examples\":{\"description\":\"Example values\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"formats\":{\"description\":\"Type-specific constraint formats (e.g. culture codes, regex patterns)\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)\",\"type\":\"string\"},\"ref\":{\"description\":\"Optional immutable identifier for the variable (used for merge identity)\",\"maxLength\":50,\"type\":\"string\"},\"type\":{\"description\":\"Optional type descriptor for validation constraints\",\"enum\":[\"text\",\"dateTime\",\"number\",\"phoneNumber\",\"url\",\"emailAddress\",\"custom\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"variables\"],\"type\":\"object\"}}},\"description\":\"Variables returned\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/templates/{templateId}/variables","rename":{"param":{"templateId":"template_id"}},"segments":[{"lit":"templates"},{"var":"template_id"},{"lit":"variables"}],"select":{"exist":["template_id"]},"transform":{"req":"`reqdata`","res":"`body.variables`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"template_id","orig":"template_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PATCH /templates/{templateId}/variables","json":"{\"operationId\":\"mergeTemplateVariables\",\"parameters\":[{\"description\":\"Unique template identifier\",\"in\":\"path\",\"name\":\"templateId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"variables\":[{\"name\":\"firstName\"},{\"description\":\"Family name\",\"name\":\"lastName\"}]}],\"properties\":{\"variables\":{\"items\":{\"examples\":[{\"description\":\"Customer first name\",\"examples\":[\"Georges\",\"Alice\"],\"formats\":[\"unicode\"],\"name\":\"firstName\",\"ref\":\"MY_FIELD_1\",\"type\":\"text\"}],\"properties\":{\"description\":{\"description\":\"Variable description\",\"type\":\"string\"},\"examples\":{\"description\":\"Example values\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"formats\":{\"description\":\"Type-specific constraint formats (e.g. culture codes, regex patterns)\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)\",\"type\":\"string\"},\"ref\":{\"description\":\"Optional immutable identifier for the variable (used for merge identity)\",\"maxLength\":50,\"type\":\"string\"},\"type\":{\"description\":\"Optional type descriptor for validation constraints\",\"enum\":[\"text\",\"dateTime\",\"number\",\"phoneNumber\",\"url\",\"emailAddress\",\"custom\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"variables\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"examples\":[{\"variables\":[{\"name\":\"firstName\"},{\"description\":\"Family name\",\"name\":\"lastName\"}]}],\"properties\":{\"variables\":{\"items\":{\"examples\":[{\"description\":\"Customer first name\",\"examples\":[\"Georges\",\"Alice\"],\"formats\":[\"unicode\"],\"name\":\"firstName\",\"ref\":\"MY_FIELD_1\",\"type\":\"text\"}],\"properties\":{\"description\":{\"description\":\"Variable description\",\"type\":\"string\"},\"examples\":{\"description\":\"Example values\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"formats\":{\"description\":\"Type-specific constraint formats (e.g. culture codes, regex patterns)\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Variable name (alphanumeric + underscore, pattern: [a-zA-Z0-9_]+)\",\"type\":\"string\"},\"ref\":{\"description\":\"Optional immutable identifier for the variable (used for merge identity)\",\"maxLength\":50,\"type\":\"string\"},\"type\":{\"description\":\"Optional type descriptor for validation constraints\",\"enum\":[\"text\",\"dateTime\",\"number\",\"phoneNumber\",\"url\",\"emailAddress\",\"custom\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"variables\"],\"type\":\"object\"}}},\"description\":\"Variables updated\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Authorization failed\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"423\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error details\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Template is locked for editing (active review with SUBMITTING, SUBMITTED or APPROVED status)\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/templates/{templateId}/variables","rename":{"param":{"templateId":"template_id"}},"segments":[{"lit":"templates"},{"var":"template_id"},{"lit":"variables"}],"select":{"exist":["template_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["template"]]},"key$":"variable","name__orig":"variable","Name":"Variable","name_":"variable","name-":"variable","NAME":"VARIABLE","index$":10}, {"active":true,"entity":"variable","key$":"BasicVariableFlow","kind":"basic","name":"BasicVariableFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"variable_ref01"},"match":{"template_id":"template01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"template_id":"template01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"variable_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"variable_ref01","srcdatavar":"variable_ref01_data","suffix":"_up0","textfield":"description"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-variable_ref01"}}],"valid":[],"index$":2}]}, 'Variable')
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
  
