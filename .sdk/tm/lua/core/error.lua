-- LmMultichannel SDK error

local LmMultichannelError = {}
LmMultichannelError.__index = LmMultichannelError


function LmMultichannelError.new(code, msg, ctx)
  local self = setmetatable({}, LmMultichannelError)
  self.is_sdk_error = true
  self.sdk = "LmMultichannel"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LmMultichannelError:error()
  return self.msg
end


function LmMultichannelError:__tostring()
  return self.msg
end


return LmMultichannelError
