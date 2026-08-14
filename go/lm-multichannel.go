package voxgiglmmultichannelsdk

import (
	"github.com/voxgig-sdk/lm-multichannel-sdk/go/core"
	"github.com/voxgig-sdk/lm-multichannel-sdk/go/entity"
	"github.com/voxgig-sdk/lm-multichannel-sdk/go/feature"
	_ "github.com/voxgig-sdk/lm-multichannel-sdk/go/utility"
)

// Type aliases preserve external API.
type LmMultichannelSDK = core.LmMultichannelSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LmMultichannelEntity = core.LmMultichannelEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LmMultichannelError = core.LmMultichannelError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewContentEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewContentEntity(client, entopts)
	}
	core.NewMessageEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewMessageEntity(client, entopts)
	}
	core.NewMessageEventEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewMessageEventEntity(client, entopts)
	}
	core.NewOptionEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewOptionEntity(client, entopts)
	}
	core.NewScheduleEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewScheduleEntity(client, entopts)
	}
	core.NewSelfEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewSelfEntity(client, entopts)
	}
	core.NewSelfAdminEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewSelfAdminEntity(client, entopts)
	}
	core.NewTemplateEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewTemplateEntity(client, entopts)
	}
	core.NewTrafficEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewTrafficEntity(client, entopts)
	}
	core.NewTrafficFileEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewTrafficFileEntity(client, entopts)
	}
	core.NewVariableEntityFunc = func(client *core.LmMultichannelSDK, entopts map[string]any) core.LmMultichannelEntity {
		return entity.NewVariableEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLmMultichannelSDK = core.NewLmMultichannelSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLmMultichannelSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LmMultichannelSDK  { return NewLmMultichannelSDK(nil) }
func Test() *LmMultichannelSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
