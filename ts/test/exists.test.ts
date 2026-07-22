
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LmMultichannelSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await LmMultichannelSDK.test()
    equal(null !== testsdk, true)
  })

})
