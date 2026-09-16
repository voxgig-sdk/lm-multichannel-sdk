package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewContentEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewMessageEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewMessageEventEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewOptionEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewScheduleEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewSelfEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewSelfAdminEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewTemplateEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewTrafficEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewTrafficFileEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

var NewVariableEntityFunc func(client *LmMultichannelSDK, entopts map[string]any) LmMultichannelEntity

