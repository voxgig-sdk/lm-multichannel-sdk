
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LmMultichannelSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LmMultichannelSDK.test()
    equal(testsdk instanceof LmMultichannelSDK, true,
      'LmMultichannelSDK.test() must return a client synchronously')
  })

})
