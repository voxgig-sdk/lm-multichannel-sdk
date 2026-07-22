package core

type LmMultichannelError struct {
	IsLmMultichannelError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLmMultichannelError(code string, msg string, ctx *Context) *LmMultichannelError {
	return &LmMultichannelError{
		IsLmMultichannelError: true,
		Sdk:              "LmMultichannel",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LmMultichannelError) Error() string {
	return e.Msg
}
