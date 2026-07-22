
import { Context } from './Context'


class LmMultichannelError extends Error {

  isLmMultichannelError = true

  sdk = 'LmMultichannel'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LmMultichannelError
}

