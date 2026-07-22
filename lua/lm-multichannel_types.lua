-- Typed models for the LmMultichannel SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Content
---@field content table

---@class ContentLoadMatch
---@field template_id string

---@class ContentCreateData
---@field template_id string

---@class Message
---@field message table
---@field schedule table

---@class MessageLoadMatch
---@field id string

---@class MessageCreateData
---@field message table
---@field schedule table

---@class MessageRemoveMatch
---@field id string

---@class MessageEvent
---@field account_id string
---@field event_id string
---@field message_status_changed table
---@field on string
---@field template_review_status_changed table
---@field user_message_received table

---@class MessageEventListMatch
---@field id string

---@class Option
---@field option table

---@class OptionLoadMatch
---@field template_id string

---@class OptionCreateData
---@field template_id string

---@class OptionUpdateData
---@field template_id string

---@class Schedule
---@field count number

---@class ScheduleLoadMatch
---@field count? number

---@class ScheduleRemoveMatch
---@field count? number

---@class Self
---@field account table

---@class SelfLoadMatch
---@field account? table

---@class SelfAdmin
---@field setting table

---@class SelfAdminUpdateData
---@field setting? table

---@class Template
---@field channel_data? table
---@field created_on string
---@field designer_url? string
---@field detail? string
---@field meta table
---@field occurred_on string
---@field review table
---@field status string
---@field template table
---@field template_id string
---@field updated_on? string

---@class TemplateLoadMatch
---@field channel_id? string
---@field id string

---@class TemplateListMatch
---@field channel_data? table
---@field created_on? string
---@field designer_url? string
---@field detail? string
---@field meta? table
---@field occurred_on? string
---@field review? table
---@field status? string
---@field template? table
---@field template_id? string
---@field updated_on? string

---@class TemplateCreateData
---@field channel_data? table
---@field created_on string
---@field designer_url? string
---@field detail? string
---@field meta table
---@field occurred_on string
---@field review table
---@field status string
---@field template table
---@field template_id string
---@field updated_on? string

---@class TemplateUpdateData
---@field channel_id string
---@field id string

---@class TemplateRemoveMatch
---@field channel_id? string
---@field id string

---@class Traffic

---@class TrafficRemoveMatch
---@field path string

---@class TrafficFile
---@field file table
---@field path string
---@field url string

---@class TrafficFileLoadMatch
---@field id string

---@class TrafficFileListMatch
---@field file? table
---@field path? string
---@field url? string

---@class Variable
---@field description? string
---@field example? table
---@field format? table
---@field name string
---@field ref? string
---@field type? string
---@field variable table

---@class VariableListMatch
---@field template_id string

---@class VariableCreateData
---@field template_id string

---@class VariableUpdateData
---@field template_id string

local M = {}

return M
