// Typed models for the LmMultichannel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Content is the typed data model for the content entity.
type Content struct {
	Content map[string]any `json:"content"`
}

// ContentLoadMatch is the typed request payload for Content.LoadTyped.
type ContentLoadMatch struct {
	TemplateId string `json:"template_id"`
}

// ContentCreateData is the typed request payload for Content.CreateTyped.
type ContentCreateData struct {
	TemplateId string `json:"template_id"`
}

// Message is the typed data model for the message entity.
type Message struct {
	Message []any `json:"message"`
	Schedule map[string]any `json:"schedule"`
}

// MessageLoadMatch is the typed request payload for Message.LoadTyped.
type MessageLoadMatch struct {
	Id string `json:"id"`
}

// MessageCreateData is the typed request payload for Message.CreateTyped.
type MessageCreateData struct {
	Message []any `json:"message"`
	Schedule map[string]any `json:"schedule"`
}

// MessageRemoveMatch is the typed request payload for Message.RemoveTyped.
type MessageRemoveMatch struct {
	Id string `json:"id"`
}

// MessageEvent is the typed data model for the message_event entity.
type MessageEvent struct {
	AccountId string `json:"account_id"`
	EventId string `json:"event_id"`
	MessageStatusChanged map[string]any `json:"message_status_changed"`
	On string `json:"on"`
	TemplateReviewStatusChanged map[string]any `json:"template_review_status_changed"`
	UserMessageReceived map[string]any `json:"user_message_received"`
}

// MessageEventListMatch is the typed request payload for MessageEvent.ListTyped.
type MessageEventListMatch struct {
	Id string `json:"id"`
}

// Option is the typed data model for the option entity.
type Option struct {
	Option map[string]any `json:"option"`
}

// OptionLoadMatch is the typed request payload for Option.LoadTyped.
type OptionLoadMatch struct {
	TemplateId string `json:"template_id"`
}

// OptionCreateData is the typed request payload for Option.CreateTyped.
type OptionCreateData struct {
	TemplateId string `json:"template_id"`
}

// OptionUpdateData is the typed request payload for Option.UpdateTyped.
type OptionUpdateData struct {
	TemplateId string `json:"template_id"`
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
	Account map[string]any `json:"account"`
}

// SelfLoadMatch is the typed request payload for Self.LoadTyped.
type SelfLoadMatch struct {
	Account *map[string]any `json:"account,omitempty"`
}

// SelfAdmin is the typed data model for the self_admin entity.
type SelfAdmin struct {
	Setting map[string]any `json:"setting"`
}

// SelfAdminUpdateData is the typed request payload for SelfAdmin.UpdateTyped.
type SelfAdminUpdateData struct {
	Setting *map[string]any `json:"setting,omitempty"`
}

// Template is the typed data model for the template entity.
type Template struct {
	ChannelData *map[string]any `json:"channel_data,omitempty"`
	CreatedOn string `json:"created_on"`
	DesignerUrl *string `json:"designer_url,omitempty"`
	Detail *string `json:"detail,omitempty"`
	Meta map[string]any `json:"meta"`
	OccurredOn string `json:"occurred_on"`
	Review map[string]any `json:"review"`
	Status string `json:"status"`
	Template map[string]any `json:"template"`
	TemplateId string `json:"template_id"`
	UpdatedOn *string `json:"updated_on,omitempty"`
}

// TemplateLoadMatch is the typed request payload for Template.LoadTyped.
type TemplateLoadMatch struct {
	ChannelId *string `json:"channel_id,omitempty"`
	Id string `json:"id"`
}

// TemplateListMatch is the typed request payload for Template.ListTyped.
type TemplateListMatch struct {
	ChannelData *map[string]any `json:"channel_data,omitempty"`
	CreatedOn *string `json:"created_on,omitempty"`
	DesignerUrl *string `json:"designer_url,omitempty"`
	Detail *string `json:"detail,omitempty"`
	Meta *map[string]any `json:"meta,omitempty"`
	OccurredOn *string `json:"occurred_on,omitempty"`
	Review *map[string]any `json:"review,omitempty"`
	Status *string `json:"status,omitempty"`
	Template *map[string]any `json:"template,omitempty"`
	TemplateId *string `json:"template_id,omitempty"`
	UpdatedOn *string `json:"updated_on,omitempty"`
}

// TemplateCreateData is the typed request payload for Template.CreateTyped.
type TemplateCreateData struct {
	ChannelData *map[string]any `json:"channel_data,omitempty"`
	CreatedOn string `json:"created_on"`
	DesignerUrl *string `json:"designer_url,omitempty"`
	Detail *string `json:"detail,omitempty"`
	Meta map[string]any `json:"meta"`
	OccurredOn string `json:"occurred_on"`
	Review map[string]any `json:"review"`
	Status string `json:"status"`
	Template map[string]any `json:"template"`
	TemplateId string `json:"template_id"`
	UpdatedOn *string `json:"updated_on,omitempty"`
}

// TemplateUpdateData is the typed request payload for Template.UpdateTyped.
type TemplateUpdateData struct {
	ChannelId string `json:"channel_id"`
	Id string `json:"id"`
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
	File []any `json:"file"`
	Path string `json:"path"`
	Url string `json:"url"`
}

// TrafficFileLoadMatch is the typed request payload for TrafficFile.LoadTyped.
type TrafficFileLoadMatch struct {
	Id string `json:"id"`
}

// TrafficFileListMatch is the typed request payload for TrafficFile.ListTyped.
type TrafficFileListMatch struct {
	File *[]any `json:"file,omitempty"`
	Path *string `json:"path,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Variable is the typed data model for the variable entity.
type Variable struct {
	Description *string `json:"description,omitempty"`
	Example *[]any `json:"example,omitempty"`
	Format *[]any `json:"format,omitempty"`
	Name string `json:"name"`
	Ref *string `json:"ref,omitempty"`
	Type *string `json:"type,omitempty"`
	Variable []any `json:"variable"`
}

// VariableListMatch is the typed request payload for Variable.ListTyped.
type VariableListMatch struct {
	TemplateId string `json:"template_id"`
}

// VariableCreateData is the typed request payload for Variable.CreateTyped.
type VariableCreateData struct {
	TemplateId string `json:"template_id"`
}

// VariableUpdateData is the typed request payload for Variable.UpdateTyped.
type VariableUpdateData struct {
	TemplateId string `json:"template_id"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
