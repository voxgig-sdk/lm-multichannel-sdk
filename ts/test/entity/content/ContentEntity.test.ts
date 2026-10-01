

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


describe('ContentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_MULTICHANNEL_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_MULTICHANNEL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmMultichannelSDK.test()
    const ent = testsdk.Content()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_MULTICHANNEL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'content.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"card":{"a":true,"h":"Card","n":"card","r":false,"sh":"Rich card containing media, text and/or buttons","t":"`$OBJECT`","key$":"card","index$":0},"carousel":{"a":true,"h":"Carousel","n":"carousel","r":true,"t":"`$OBJECT`","key$":"carousel","index$":1},"content":{"a":true,"h":"Content","n":"content","r":true,"sh":"Message content.","t":"`$OBJECT`","key$":"content","index$":2},"fromTemplate":{"a":true,"h":"From Template","n":"fromTemplate","r":true,"sh":"Content generated from a pre-defined template","t":"`$OBJECT`","key$":"fromTemplate","index$":3},"location":{"a":true,"h":"Location","n":"location","r":true,"t":"`$OBJECT`","key$":"location","index$":4},"media":{"a":true,"h":"Media","n":"media","r":true,"t":"`$OBJECT`","key$":"media","index$":5},"suggestions":{"a":true,"h":"Suggestions","n":"suggestions","r":false,"sh":"Quick replies / suggestion buttons (not applicable to fromTemplate)","t":"`$ARRAY`","key$":"suggestions","index$":6},"text":{"a":true,"h":"Text","n":"text","r":false,"sh":"Simple text content","t":"`$STRING`","key$":"text","index$":7}},"name":"content","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /templates/{templateId}/content","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"template_id","or":"templateId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/templates/{templateId}/content","q":{"exist":["template_id"]},"r":{"param":{"templateId":"template_id"}},"s":[{"lit":"templates"},{"var":"template_id"},{"lit":"content"}],"t":{"req":{"content":"`reqdata`"},"res":"`body.content`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /templates/{templateId}/content","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"template_id","or":"templateId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/templates/{templateId}/content","q":{"exist":["template_id"]},"r":{"param":{"templateId":"template_id"}},"s":[{"lit":"templates"},{"var":"template_id"},{"lit":"content"}],"t":{"req":"`reqdata`","res":"`body.content`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.template"]]},"key$":"content","name__orig":"content","Name":"Content","name_":"content","name-":"content","NAME":"CONTENT","index$":0}, {"active":true,"entity":"content","key$":"BasicContentFlow","kind":"basic","name":"BasicContentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"content_ref01"},"m":{"template_id":"template01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"content_ref01","srcdatavar":"content_ref01_data","suffix":"_dt0"},"m":{"id":"content01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-content_ref01"}}],"index$":1}]}, 'Content', {"POST /templates/{templateId}/content":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["content"],"properties":{"content":{"description":"Message content. Exactly one of the content type properties must be provided:\ntext, media, location, card, carousel, or fromTemplate.\nSuggestions (quick replies) can be added to primitive content types.\n","examples":[{"card":{"buttons":[],"media":{},"text":"Enjoy your personal -30% rebate on all items","title":"Private sale"}}],"key$":"content","properties":{"card":{"description":"Rich card containing media, text and/or buttons","examples":[{}],"properties":{"buttons":{},"location":{},"media":{},"subtitle":{},"text":{},"title":{}},"type":"object","x-ref":"#/components/schemas/Card","key$":"card"},"carousel":{"examples":[{}],"properties":{"cards":{},"text":{}},"required":["cards"],"type":"object","x-ref":"#/components/schemas/Carousel","key$":"carousel"},"fromTemplate":{"description":"Content generated from a pre-defined template","examples":[{}],"properties":{"templateId":{},"variables":{}},"required":["templateId"],"type":"object","x-ref":"#/components/schemas/FromTemplate","key$":"fromTemplate"},"location":{"examples":[{}],"properties":{"description":{},"latitude":{},"longitude":{},"title":{}},"required":["latitude","longitude"],"type":"object","x-ref":"#/components/schemas/Location","key$":"location"},"media":{"examples":[{}],"properties":{"description":{},"source":{},"thumbnail":{},"type":{}},"required":["type","source"],"type":"object","x-ref":"#/components/schemas/Media","key$":"media"},"suggestions":{"description":"Quick replies / suggestion buttons (not applicable to fromTemplate)","items":{"description":"Interactive button / suggestion. Exactly one action property should be provided:\nreply, dial, openUrl, createCalendarEvent, shareLocation, viewLocation, copyCode, or flow.\nIf no action property is provided, the button defaults to a reply using the caption as text.\n","examples":[],"properties":{},"required":[],"type":"object","x-ref":"#/components/schemas/Button"},"type":"array","key$":"suggestions"},"text":{"description":"Simple text content","type":"string","key$":"text"}},"type":"object","x-ref":"#/components/schemas/Content","index$":0}},"examples":[{"content":{"card":{"title":"Hello there!","text":"Hello {{firstName}} {{lastName}}!"}}}],"x-ref":"#/components/schemas/ContentWrapper","index$":1}}}},"parameters":[{"name":"templateId","in":"path","required":true,"schema":{"type":"string"},"description":"Unique template identifier","x-ref":"#/components/parameters/TemplateId","index$":0}]},"GET /templates/{templateId}/content":{"protocol":"http","parameters":[{"name":"templateId","in":"path","required":true,"schema":{"type":"string"},"description":"Unique template identifier","x-ref":"#/components/parameters/TemplateId","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const content_ref01_ent = client.Content()
    let content_ref01_data = setup.data.new.content['content_ref01']
    content_ref01_data['template_id'] = setup.idmap['template01']

    content_ref01_data = (await content_ref01_ent.create(content_ref01_data)).data()
    assert(null != content_ref01_data)



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/content/ContentTestData.json')

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
    ['content01','content02','content03','template01','template02','template03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LM_MULTICHANNEL_TEST_CONTENT_ENTID': idmap,
    'LM_MULTICHANNEL_TEST_LIVE': 'FALSE',
    'LM_MULTICHANNEL_TEST_EXPLAIN': 'FALSE',
    'LM_MULTICHANNEL_APIKEY': '',
  })

  idmap = env['LM_MULTICHANNEL_TEST_CONTENT_ENTID']

  const live = 'TRUE' === env.LM_MULTICHANNEL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_MULTICHANNEL_TEST_CONTENT_ENTID']
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
  
