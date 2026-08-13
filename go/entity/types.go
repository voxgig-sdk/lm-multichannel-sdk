// Typed models for the LmMultichannel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/lm-multichannel-sdk/go/core"
)

// Content is the typed data model for the content entity.
type Content struct {
	Card *map[string]any `json:"card,omitempty"`
	Carousel map[string]any `json:"carousel"`
	Content map[string]any `json:"content"`
	FromTemplate map[string]any `json:"fromTemplate"`
	Location map[string]any `json:"location"`
	Media map[string]any `json:"media"`
	Suggestions *[]any `json:"suggestions,omitempty"`
	Text *string `json:"text,omitempty"`
}

// ContentLoadMatch is the typed request payload for Content.LoadTyped.
type ContentLoadMatch struct {
	TemplateId string `json:"template_id"`
}

// ContentCreateData is the typed request payload for Content.CreateTyped.
type ContentCreateData struct {
	TemplateId string `json:"template_id"`
	Card *map[string]any `json:"card,omitempty"`
	Carousel map[string]any `json:"carousel"`
	Content map[string]any `json:"content"`
	FromTemplate map[string]any `json:"fromTemplate"`
	Location map[string]any `json:"location"`
	Media map[string]any `json:"media"`
	Suggestions *[]any `json:"suggestions,omitempty"`
	Text *string `json:"text,omitempty"`
}

// Message is the typed data model for the message entity.
type Message struct {
	CampaignId *string `json:"campaignId,omitempty"`
	Messages []any `json:"messages"`
	ScheduleAt string `json:"scheduleAt"`
}

// MessageLoadMatch is the typed request payload for Message.LoadTyped.
type MessageLoadMatch struct {
	Id string `json:"id"`
}

// MessageCreateData is the typed request payload for Message.CreateTyped.
type MessageCreateData struct {
	CampaignId *string `json:"campaignId,omitempty"`
	Messages []any `json:"messages"`
	ScheduleAt string `json:"scheduleAt"`
}

// MessageRemoveMatch is the typed request payload for Message.RemoveTyped.
type MessageRemoveMatch struct {
	Id string `json:"id"`
}

// MessageEvent is the typed data model for the message_event entity.
type MessageEvent struct {
	AccountId string `json:"accountId"`
	EventId string `json:"eventId"`
	MessageStatusChanged map[string]any `json:"messageStatusChanged"`
	On string `json:"on"`
	TemplateReviewStatusChanged map[string]any `json:"templateReviewStatusChanged"`
	UserMessageReceived map[string]any `json:"userMessageReceived"`
}

// MessageEventListMatch is the typed request payload for MessageEvent.ListTyped.
type MessageEventListMatch struct {
	Id string `json:"id"`
}

// Option is the typed data model for the option entity.
type Option struct {
	Options map[string]any `json:"options"`
}

// OptionLoadMatch is the typed request payload for Option.LoadTyped.
type OptionLoadMatch struct {
	TemplateId string `json:"template_id"`
}

// OptionCreateData is the typed request payload for Option.CreateTyped.
type OptionCreateData struct {
	TemplateId string `json:"template_id"`
	Options map[string]any `json:"options"`
}

// OptionUpdateData is the typed request payload for Option.UpdateTyped.
type OptionUpdateData struct {
	TemplateId string `json:"template_id"`
	Options *map[string]any `json:"options,omitempty"`
}

// Schedule is the typed data model for the schedule entity.
type Schedule struct {
	Count int `json:"count"`
}

// ScheduleLoadMatch is the typed request payload for Schedule.LoadTyped.
type ScheduleLoadMatch struct {
	Count *int `json:"count,omitempty"`
}

// ScheduleRemoveMatch is the typed request payload for Schedule.RemoveTyped.
type ScheduleRemoveMatch struct {
	Count *int `json:"count,omitempty"`
}

// Self is the typed data model for the self entity.
type Self struct {
	AccountId string `json:"accountId"`
	Settings map[string]any `json:"settings"`
}

// SelfLoadMatch is the typed request payload for Self.LoadTyped.
type SelfLoadMatch struct {
	AccountId *string `json:"accountId,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
}

// SelfAdmin is the typed data model for the self_admin entity.
type SelfAdmin struct {
	Callback map[string]any `json:"callback"`
	Settings map[string]any `json:"settings"`
}

// SelfAdminUpdateData is the typed request payload for SelfAdmin.UpdateTyped.
type SelfAdminUpdateData struct {
	Callback *map[string]any `json:"callback,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
}

// Template is the typed data model for the template entity.
type Template struct {
	ChannelData *map[string]any `json:"channelData,omitempty"`
	Content *map[string]any `json:"content,omitempty"`
	CreatedOn string `json:"createdOn"`
	DesignerUrl *string `json:"designerUrl,omitempty"`
	Details *string `json:"details,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	OccurredOn string `json:"occurredOn"`
	Options *map[string]any `json:"options,omitempty"`
	Reviews *map[string]any `json:"reviews,omitempty"`
	Status string `json:"status"`
	Template map[string]any `json:"template"`
	TemplateId string `json:"templateId"`
	UpdatedOn *string `json:"updatedOn,omitempty"`
	Variables *[]any `json:"variables,omitempty"`
}

// TemplateLoadMatch is the typed request payload for Template.LoadTyped.
type TemplateLoadMatch struct {
	ChannelId *string `json:"channel_id,omitempty"`
	Id string `json:"id"`
}

// TemplateListMatch is the typed request payload for Template.ListTyped.
type TemplateListMatch struct {
	ChannelData *map[string]any `json:"channelData,omitempty"`
	Content *map[string]any `json:"content,omitempty"`
	CreatedOn *string `json:"createdOn,omitempty"`
	DesignerUrl *string `json:"designerUrl,omitempty"`
	Details *string `json:"details,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	OccurredOn *string `json:"occurredOn,omitempty"`
	Options *map[string]any `json:"options,omitempty"`
	Reviews *map[string]any `json:"reviews,omitempty"`
	Status *string `json:"status,omitempty"`
	Template *map[string]any `json:"template,omitempty"`
	TemplateId *string `json:"templateId,omitempty"`
	UpdatedOn *string `json:"updatedOn,omitempty"`
	Variables *[]any `json:"variables,omitempty"`
}

// TemplateCreateData is the typed request payload for Template.CreateTyped.
type TemplateCreateData struct {
	ChannelData *map[string]any `json:"channelData,omitempty"`
	Content *map[string]any `json:"content,omitempty"`
	CreatedOn string `json:"createdOn"`
	DesignerUrl *string `json:"designerUrl,omitempty"`
	Details *string `json:"details,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	OccurredOn string `json:"occurredOn"`
	Options *map[string]any `json:"options,omitempty"`
	Reviews *map[string]any `json:"reviews,omitempty"`
	Status string `json:"status"`
	Template map[string]any `json:"template"`
	TemplateId string `json:"templateId"`
	UpdatedOn *string `json:"updatedOn,omitempty"`
	Variables *[]any `json:"variables,omitempty"`
}

// TemplateUpdateData is the typed request payload for Template.UpdateTyped.
type TemplateUpdateData struct {
	ChannelId string `json:"channel_id"`
	Id string `json:"id"`
	ChannelData *map[string]any `json:"channelData,omitempty"`
	Content *map[string]any `json:"content,omitempty"`
	CreatedOn *string `json:"createdOn,omitempty"`
	DesignerUrl *string `json:"designerUrl,omitempty"`
	Details *string `json:"details,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	OccurredOn *string `json:"occurredOn,omitempty"`
	Options *map[string]any `json:"options,omitempty"`
	Reviews *map[string]any `json:"reviews,omitempty"`
	Status *string `json:"status,omitempty"`
	Template *map[string]any `json:"template,omitempty"`
	TemplateId *string `json:"templateId,omitempty"`
	UpdatedOn *string `json:"updatedOn,omitempty"`
	Variables *[]any `json:"variables,omitempty"`
}

// TemplateRemoveMatch is the typed request payload for Template.RemoveTyped.
type TemplateRemoveMatch struct {
	ChannelId *string `json:"channel_id,omitempty"`
	Id string `json:"id"`
}

// Traffic is the typed data model for the traffic entity.
type Traffic struct {
}

// TrafficRemoveMatch is the typed request payload for Traffic.RemoveTyped.
type TrafficRemoveMatch struct {
	Path string `json:"path"`
}

// TrafficFile is the typed data model for the traffic_file entity.
type TrafficFile struct {
	Files []any `json:"files"`
	Path string `json:"path"`
	Url string `json:"url"`
}

// TrafficFileLoadMatch is the typed request payload for TrafficFile.LoadTyped.
type TrafficFileLoadMatch struct {
	Id string `json:"id"`
}

// TrafficFileListMatch is the typed request payload for TrafficFile.ListTyped.
type TrafficFileListMatch struct {
	Files *[]any `json:"files,omitempty"`
	Path *string `json:"path,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Variable is the typed data model for the variable entity.
type Variable struct {
	Description *string `json:"description,omitempty"`
	Examples *[]any `json:"examples,omitempty"`
	Formats *[]any `json:"formats,omitempty"`
	Name string `json:"name"`
	Ref *string `json:"ref,omitempty"`
	Type *string `json:"type,omitempty"`
	Variables []any `json:"variables"`
}

// VariableListMatch is the typed request payload for Variable.ListTyped.
type VariableListMatch struct {
	TemplateId string `json:"template_id"`
}

// VariableCreateData is the typed request payload for Variable.CreateTyped.
type VariableCreateData struct {
	TemplateId string `json:"template_id"`
	Description *string `json:"description,omitempty"`
	Examples *[]any `json:"examples,omitempty"`
	Formats *[]any `json:"formats,omitempty"`
	Name string `json:"name"`
	Ref *string `json:"ref,omitempty"`
	Type *string `json:"type,omitempty"`
	Variables []any `json:"variables"`
}

// VariableUpdateData is the typed request payload for Variable.UpdateTyped.
type VariableUpdateData struct {
	TemplateId string `json:"template_id"`
	Description *string `json:"description,omitempty"`
	Examples *[]any `json:"examples,omitempty"`
	Formats *[]any `json:"formats,omitempty"`
	Name *string `json:"name,omitempty"`
	Ref *string `json:"ref,omitempty"`
	Type *string `json:"type,omitempty"`
	Variables *[]any `json:"variables,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
