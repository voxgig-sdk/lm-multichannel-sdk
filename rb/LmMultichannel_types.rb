# frozen_string_literal: true

# Typed models for the LmMultichannel SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Content entity data model.
#
# @!attribute [rw] content
#   @return [Hash]
Content = Struct.new(
  :content,
  keyword_init: true
)

# Request payload for Content#load.
#
# @!attribute [rw] template_id
#   @return [String]
ContentLoadMatch = Struct.new(
  :template_id,
  keyword_init: true
)

# Request payload for Content#create.
#
# @!attribute [rw] template_id
#   @return [String]
ContentCreateData = Struct.new(
  :template_id,
  keyword_init: true
)

# Message entity data model.
#
# @!attribute [rw] message
#   @return [Array]
#
# @!attribute [rw] schedule
#   @return [Hash]
Message = Struct.new(
  :message,
  :schedule,
  keyword_init: true
)

# Request payload for Message#load.
#
# @!attribute [rw] id
#   @return [String]
MessageLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Message#create.
#
# @!attribute [rw] message
#   @return [Array]
#
# @!attribute [rw] schedule
#   @return [Hash]
MessageCreateData = Struct.new(
  :message,
  :schedule,
  keyword_init: true
)

# Request payload for Message#remove.
#
# @!attribute [rw] id
#   @return [String]
MessageRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# MessageEvent entity data model.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] event_id
#   @return [String]
#
# @!attribute [rw] message_status_changed
#   @return [Hash]
#
# @!attribute [rw] on
#   @return [String]
#
# @!attribute [rw] template_review_status_changed
#   @return [Hash]
#
# @!attribute [rw] user_message_received
#   @return [Hash]
MessageEvent = Struct.new(
  :account_id,
  :event_id,
  :message_status_changed,
  :on,
  :template_review_status_changed,
  :user_message_received,
  keyword_init: true
)

# Request payload for MessageEvent#list.
#
# @!attribute [rw] id
#   @return [String]
MessageEventListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Option entity data model.
#
# @!attribute [rw] option
#   @return [Hash]
Option = Struct.new(
  :option,
  keyword_init: true
)

# Request payload for Option#load.
#
# @!attribute [rw] template_id
#   @return [String]
OptionLoadMatch = Struct.new(
  :template_id,
  keyword_init: true
)

# Request payload for Option#create.
#
# @!attribute [rw] template_id
#   @return [String]
OptionCreateData = Struct.new(
  :template_id,
  keyword_init: true
)

# Request payload for Option#update.
#
# @!attribute [rw] template_id
#   @return [String]
OptionUpdateData = Struct.new(
  :template_id,
  keyword_init: true
)

# Schedule entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
Schedule = Struct.new(
  :count,
  keyword_init: true
)

# Request payload for Schedule#load.
#
# @!attribute [rw] count
#   @return [Integer, nil]
ScheduleLoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Request payload for Schedule#remove.
#
# @!attribute [rw] count
#   @return [Integer, nil]
ScheduleRemoveMatch = Struct.new(
  :count,
  keyword_init: true
)

# Self entity data model.
#
# @!attribute [rw] account
#   @return [Hash]
Self = Struct.new(
  :account,
  keyword_init: true
)

# Request payload for Self#load.
#
# @!attribute [rw] account
#   @return [Hash, nil]
SelfLoadMatch = Struct.new(
  :account,
  keyword_init: true
)

# SelfAdmin entity data model.
#
# @!attribute [rw] setting
#   @return [Hash]
SelfAdmin = Struct.new(
  :setting,
  keyword_init: true
)

# Request payload for SelfAdmin#update.
#
# @!attribute [rw] setting
#   @return [Hash, nil]
SelfAdminUpdateData = Struct.new(
  :setting,
  keyword_init: true
)

# Template entity data model.
#
# @!attribute [rw] channel_data
#   @return [Hash, nil]
#
# @!attribute [rw] created_on
#   @return [String]
#
# @!attribute [rw] designer_url
#   @return [String, nil]
#
# @!attribute [rw] detail
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash]
#
# @!attribute [rw] occurred_on
#   @return [String]
#
# @!attribute [rw] review
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] template
#   @return [Hash]
#
# @!attribute [rw] template_id
#   @return [String]
#
# @!attribute [rw] updated_on
#   @return [String, nil]
Template = Struct.new(
  :channel_data,
  :created_on,
  :designer_url,
  :detail,
  :meta,
  :occurred_on,
  :review,
  :status,
  :template,
  :template_id,
  :updated_on,
  keyword_init: true
)

# Request payload for Template#load.
#
# @!attribute [rw] channel_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
TemplateLoadMatch = Struct.new(
  :channel_id,
  :id,
  keyword_init: true
)

# Request payload for Template#list.
#
# @!attribute [rw] channel_data
#   @return [Hash, nil]
#
# @!attribute [rw] created_on
#   @return [String, nil]
#
# @!attribute [rw] designer_url
#   @return [String, nil]
#
# @!attribute [rw] detail
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] occurred_on
#   @return [String, nil]
#
# @!attribute [rw] review
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] template
#   @return [Hash, nil]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] updated_on
#   @return [String, nil]
TemplateListMatch = Struct.new(
  :channel_data,
  :created_on,
  :designer_url,
  :detail,
  :meta,
  :occurred_on,
  :review,
  :status,
  :template,
  :template_id,
  :updated_on,
  keyword_init: true
)

# Request payload for Template#create.
#
# @!attribute [rw] channel_data
#   @return [Hash, nil]
#
# @!attribute [rw] created_on
#   @return [String]
#
# @!attribute [rw] designer_url
#   @return [String, nil]
#
# @!attribute [rw] detail
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash]
#
# @!attribute [rw] occurred_on
#   @return [String]
#
# @!attribute [rw] review
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] template
#   @return [Hash]
#
# @!attribute [rw] template_id
#   @return [String]
#
# @!attribute [rw] updated_on
#   @return [String, nil]
TemplateCreateData = Struct.new(
  :channel_data,
  :created_on,
  :designer_url,
  :detail,
  :meta,
  :occurred_on,
  :review,
  :status,
  :template,
  :template_id,
  :updated_on,
  keyword_init: true
)

# Request payload for Template#update.
#
# @!attribute [rw] channel_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
TemplateUpdateData = Struct.new(
  :channel_id,
  :id,
  keyword_init: true
)

# Request payload for Template#remove.
#
# @!attribute [rw] channel_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
TemplateRemoveMatch = Struct.new(
  :channel_id,
  :id,
  keyword_init: true
)

# Traffic entity data model.
class Traffic
end

# Request payload for Traffic#remove.
#
# @!attribute [rw] path
#   @return [String]
TrafficRemoveMatch = Struct.new(
  :path,
  keyword_init: true
)

# TrafficFile entity data model.
#
# @!attribute [rw] file
#   @return [Array]
#
# @!attribute [rw] path
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
TrafficFile = Struct.new(
  :file,
  :path,
  :url,
  keyword_init: true
)

# Request payload for TrafficFile#load.
#
# @!attribute [rw] id
#   @return [String]
TrafficFileLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for TrafficFile#list.
#
# @!attribute [rw] file
#   @return [Array, nil]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
TrafficFileListMatch = Struct.new(
  :file,
  :path,
  :url,
  keyword_init: true
)

# Variable entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] example
#   @return [Array, nil]
#
# @!attribute [rw] format
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] variable
#   @return [Array]
Variable = Struct.new(
  :description,
  :example,
  :format,
  :name,
  :ref,
  :type,
  :variable,
  keyword_init: true
)

# Request payload for Variable#list.
#
# @!attribute [rw] template_id
#   @return [String]
VariableListMatch = Struct.new(
  :template_id,
  keyword_init: true
)

# Request payload for Variable#create.
#
# @!attribute [rw] template_id
#   @return [String]
VariableCreateData = Struct.new(
  :template_id,
  keyword_init: true
)

# Request payload for Variable#update.
#
# @!attribute [rw] template_id
#   @return [String]
VariableUpdateData = Struct.new(
  :template_id,
  keyword_init: true
)

