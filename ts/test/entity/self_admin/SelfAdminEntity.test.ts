

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"callback","req":true,"type":"`$OBJECT`","index$":0},{"active":true,"name":"settings","req":true,"type":"`$OBJECT`","index$":1}],"name":"self_admin","op":{"update":{"input":"data","name":"update","points":[{"active":true,"args":{},"contract":{"id":"PATCH /self/settings","json":"{\"operationId\":\"updateAccountSettings\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"updateAccountSettings\":{\"value\":{\"settings\":{\"callback\":{\"auth\":{\"login\":\"someuser\",\"password\":\"secret\",\"type\":\"httpBasic\"},\"url\":\"https://acme.com/ocm\"}}}}},\"schema\":{\"properties\":{\"settings\":{\"examples\":[{\"callback\":{\"auth\":{\"login\":\"someuser\",\"password\":\"secret-ref:acme_...\",\"type\":\"httpBasic\"},\"url\":\"https://acme.com\"}}],\"properties\":{\"callback\":{\"examples\":[{\"auth\":{\"headerName\":\"x-api-key\",\"password\":\"secret\",\"type\":\"customHttpHeader\"},\"enableCompression\":true,\"url\":\"https://acme.com/ocm\"}],\"properties\":{\"auth\":{\"examples\":[{\"login\":\"someuser\",\"password\":\"secret\",\"type\":\"httpBasic\"}],\"properties\":{\"headerName\":{\"description\":\"Custom header name for customHttpHeader type\",\"type\":\"string\"},\"login\":{\"description\":\"Login for httpBasic type\",\"type\":\"string\"},\"password\":{\"description\":\"Secret value (write-only, replaced by reference after storage)\",\"type\":\"string\"},\"type\":{\"description\":\"Authentication type\",\"enum\":[\"httpBasic\",\"bearerToken\",\"customHttpHeader\"],\"type\":\"string\"}},\"required\":[\"type\",\"password\"],\"type\":\"object\"},\"enableCompression\":{\"description\":\"Enable GZIP compression for callback requests (default false)\",\"type\":\"boolean\"},\"tls\":{\"description\":\"Client SSL certificate authentication\",\"examples\":[{\"certificate\":\"LS0tLS1CRUdJTiBF...\",\"password\":\"secret\"}],\"properties\":{\"certificate\":{\"description\":\"Base64-encoded PEM (with embedded private key) or PFX/PKCS#12 certificate\",\"type\":\"string\"},\"password\":{\"description\":\"Private key password\",\"type\":\"string\"}},\"required\":[\"certificate\",\"password\"],\"type\":\"object\"},\"url\":{\"description\":\"HTTPS callback endpoint URL\",\"type\":\"string\"}},\"required\":[\"url\"],\"type\":\"object\"}},\"type\":\"object\"}},\"required\":[\"settings\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"settings\":{\"examples\":[{\"callback\":{\"auth\":{\"login\":\"someuser\",\"password\":\"secret-ref:acme_...\",\"type\":\"httpBasic\"},\"url\":\"https://acme.com\"}}],\"properties\":{\"callback\":{\"examples\":[{\"auth\":{\"headerName\":\"x-api-key\",\"password\":\"secret\",\"type\":\"customHttpHeader\"},\"enableCompression\":true,\"url\":\"https://acme.com/ocm\"}],\"properties\":{\"auth\":{\"examples\":[{\"login\":\"someuser\",\"password\":\"secret\",\"type\":\"httpBasic\"}],\"properties\":{\"headerName\":{\"description\":\"Custom header name for customHttpHeader type\",\"type\":\"string\"},\"login\":{\"description\":\"Login for httpBasic type\",\"type\":\"string\"},\"password\":{\"description\":\"Secret value (write-only, replaced by reference after storage)\",\"type\":\"string\"},\"type\":{\"description\":\"Authentication type\",\"enum\":[\"httpBasic\",\"bearerToken\",\"customHttpHeader\"],\"type\":\"string\"}},\"required\":[\"type\",\"password\"],\"type\":\"object\"},\"enableCompression\":{\"description\":\"Enable GZIP compression for callback requests (default false)\",\"type\":\"boolean\"},\"tls\":{\"description\":\"Client SSL certificate authentication\",\"examples\":[{\"certificate\":\"LS0tLS1CRUdJTiBF...\",\"password\":\"secret\"}],\"properties\":{\"certificate\":{\"description\":\"Base64-encoded PEM (with embedded private key) or PFX/PKCS#12 certificate\",\"type\":\"string\"},\"password\":{\"description\":\"Private key password\",\"type\":\"string\"}},\"required\":[\"certificate\",\"password\"],\"type\":\"object\"},\"url\":{\"description\":\"HTTPS callback endpoint URL\",\"type\":\"string\"}},\"required\":[\"url\"],\"type\":\"object\"}},\"type\":\"object\"}},\"required\":[\"settings\"],\"type\":\"object\"}}},\"description\":\"Settings updated\"}},\"security\":[{\"apiKey\":[]},{\"oauth2\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for /v1 endpoints\",\"in\":\"header\",\"name\":\"x-api-key\",\"type\":\"apiKey\"},\"oauth2\":{\"description\":\"OAuth2 client credentials for /v2 endpoints\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/self/settings","segments":[{"lit":"self"},{"lit":"settings"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.settings`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"self_admin","name__orig":"self_admin","Name":"SelfAdmin","name_":"self_admin","name-":"self-admin","NAME":"SELF_ADMIN","index$":6}, {"active":true,"entity":"self_admin","key$":"BasicSelfAdminFlow","kind":"basic","name":"BasicSelfAdminFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"self_admin_ref01","srcdatavar":"self_admin_ref01_data","suffix":"_up0"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-self_admin_ref01"}}],"valid":[],"index$":0}]}, 'SelfAdmin')
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
  
