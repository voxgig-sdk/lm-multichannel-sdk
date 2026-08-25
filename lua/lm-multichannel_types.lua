-- Typed models for the LmMultichannel SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Content
---@field card? table
---@field carousel table
---@field content table
---@field fromTemplate table
---@field location table
---@field media table
---@field suggestions? table
---@field text? string

---@class ContentLoadMatch
---@field template_id string

---@class ContentCreateData
---@field template_id string
---@field card? table
---@field carousel table
---@field content table
---@field fromTemplate table
---@field location table
---@field media table
---@field suggestions? table
---@field text? string

---@class Message
---@field campaignId? string
---@field id? string
---@field messages table
---@field scheduleAt string

---@class MessageLoadMatch
---@field id string

---@class MessageCreateData
---@field campaignId? string
---@field id? string
---@field messages table
---@field scheduleAt string

---@class MessageRemoveMatch
---@field id string

---@class MessageEvent
---@field accountId string
---@field eventId string
---@field id? string
---@field messageStatusChanged table
---@field on string
---@field templateReviewStatusChanged table
---@field userMessageReceived table

---@class MessageEventListMatch
---@field id string

---@class Option
---@field options table

---@class OptionLoadMatch
---@field template_id string

---@class OptionCreateData
---@field template_id string
---@field options table

---@class OptionUpdateData
---@field template_id string
---@field options? table

---@class Schedule
---@field count number

---@class ScheduleLoadMatch
---@field count? number

---@class ScheduleRemoveMatch
---@field count? number

---@class Self
---@field accountId string
---@field settings table

---@class SelfLoadMatch
---@field accountId? string
---@field settings? table

---@class SelfAdmin
---@field callback table
---@field settings table

---@class SelfAdminUpdateData
---@field callback? table
---@field settings? table

---@class Template
---@field channelData? table
---@field content? table
---@field createdOn string
---@field designerUrl? string
---@field details? string
---@field id? string
---@field meta? table
---@field occurredOn string
---@field options? table
---@field reviews? table
---@field status string
---@field template table
---@field templateId string
---@field updatedOn? string
---@field variables? table

---@class TemplateLoadMatch
---@field channel_id? string
---@field id string

---@class TemplateListMatch
---@field channelData? table
---@field content? table
---@field createdOn? string
---@field designerUrl? string
---@field details? string
---@field id? string
---@field meta? table
---@field occurredOn? string
---@field options? table
---@field reviews? table
---@field status? string
---@field template? table
---@field templateId? string
---@field updatedOn? string
---@field variables? table

---@class TemplateCreateData
---@field channelData? table
---@field content? table
---@field createdOn string
---@field designerUrl? string
---@field details? string
---@field id? string
---@field meta? table
---@field occurredOn string
---@field options? table
---@field reviews? table
---@field status string
---@field template table
---@field templateId string
---@field updatedOn? string
---@field variables? table

---@class TemplateUpdateData
---@field channel_id string
---@field id string
---@field channelData? table
---@field content? table
---@field createdOn? string
---@field designerUrl? string
---@field details? string
---@field meta? table
---@field occurredOn? string
---@field options? table
---@field reviews? table
---@field status? string
---@field template? table
---@field templateId? string
---@field updatedOn? string
---@field variables? table

---@class TemplateRemoveMatch
---@field channel_id? string
---@field id string

---@class Traffic

---@class TrafficRemoveMatch
---@field path string

---@class TrafficFile
---@field files table
---@field id? string
---@field path string
---@field url string

---@class TrafficFileLoadMatch
---@field id string

---@class TrafficFileListMatch
---@field files? table
---@field id? string
---@field path? string
---@field url? string

---@class Variable
---@field description? string
---@field examples? table
---@field formats? table
---@field name string
---@field ref? string
---@field type? string
---@field variables table

---@class VariableListMatch
---@field template_id string

---@class VariableCreateData
---@field template_id string
---@field description? string
---@field examples? table
---@field formats? table
---@field name string
---@field ref? string
---@field type? string
---@field variables table

---@class VariableUpdateData
---@field template_id string
---@field description? string
---@field examples? table
---@field formats? table
---@field name? string
---@field ref? string
---@field type? string
---@field variables? table

local M = {}

return M
