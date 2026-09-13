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
# @!attribute [rw] card
#   @return [Hash, nil]
#
# @!attribute [rw] carousel
#   @return [Hash]
#
# @!attribute [rw] content
#   @return [Hash]
#
# @!attribute [rw] fromTemplate
#   @return [Hash]
#
# @!attribute [rw] location
#   @return [Hash]
#
# @!attribute [rw] media
#   @return [Hash]
#
# @!attribute [rw] suggestions
#   @return [Array, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
Content = Struct.new(
  :card,
  :carousel,
  :content,
  :fromTemplate,
  :location,
  :media,
  :suggestions,
  :text,
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
#
# @!attribute [rw] card
#   @return [Hash, nil]
#
# @!attribute [rw] carousel
#   @return [Hash]
#
# @!attribute [rw] content
#   @return [Hash]
#
# @!attribute [rw] fromTemplate
#   @return [Hash]
#
# @!attribute [rw] location
#   @return [Hash]
#
# @!attribute [rw] media
#   @return [Hash]
#
# @!attribute [rw] suggestions
#   @return [Array, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
ContentCreateData = Struct.new(
  :template_id,
  :card,
  :carousel,
  :content,
  :fromTemplate,
  :location,
  :media,
  :suggestions,
  :text,
  keyword_init: true
)

# Message entity data model.
#
# @!attribute [rw] campaignId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] scheduleAt
#   @return [String]
Message = Struct.new(
  :campaignId,
  :id,
  :messages,
  :scheduleAt,
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
# @!attribute [rw] campaignId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] scheduleAt
#   @return [String]
MessageCreateData = Struct.new(
  :campaignId,
  :id,
  :messages,
  :scheduleAt,
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
# @!attribute [rw] accountId
#   @return [String]
#
# @!attribute [rw] eventId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] messageStatusChanged
#   @return [Hash]
#
# @!attribute [rw] on
#   @return [String]
#
# @!attribute [rw] templateReviewStatusChanged
#   @return [Hash]
#
# @!attribute [rw] userMessageReceived
#   @return [Hash]
MessageEvent = Struct.new(
  :accountId,
  :eventId,
  :id,
  :messageStatusChanged,
  :on,
  :templateReviewStatusChanged,
  :userMessageReceived,
  keyword_init: true
)

# Request payload for MessageEvent#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] page_index
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
MessageEventListMatch = Struct.new(
  :id,
  :page_index,
  :page_size,
  :sort,
  keyword_init: true
)

# Option entity data model.
#
# @!attribute [rw] options
#   @return [Hash]
Option = Struct.new(
  :options,
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
#
# @!attribute [rw] options
#   @return [Hash]
OptionCreateData = Struct.new(
  :template_id,
  :options,
  keyword_init: true
)

# Request payload for Option#update.
#
# @!attribute [rw] template_id
#   @return [String]
#
# @!attribute [rw] options
#   @return [Hash, nil]
OptionUpdateData = Struct.new(
  :template_id,
  :options,
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
# @!attribute [rw] between
#   @return [String, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] time_zone
#   @return [String, nil]
ScheduleLoadMatch = Struct.new(
  :between,
  :campaign_id,
  :time_zone,
  keyword_init: true
)

# Request payload for Schedule#remove.
#
# @!attribute [rw] between
#   @return [String, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] time_zone
#   @return [String, nil]
ScheduleRemoveMatch = Struct.new(
  :between,
  :campaign_id,
  :time_zone,
  keyword_init: true
)

# Self entity data model.
#
# @!attribute [rw] accountId
#   @return [String]
#
# @!attribute [rw] settings
#   @return [Hash]
Self = Struct.new(
  :accountId,
  :settings,
  keyword_init: true
)

# Request payload for Self#load.
#
# @!attribute [rw] accountId
#   @return [String, nil]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
SelfLoadMatch = Struct.new(
  :accountId,
  :settings,
  keyword_init: true
)

# SelfAdmin entity data model.
#
# @!attribute [rw] callback
#   @return [Hash]
#
# @!attribute [rw] settings
#   @return [Hash]
SelfAdmin = Struct.new(
  :callback,
  :settings,
  keyword_init: true
)

# Request payload for SelfAdmin#update.
#
# @!attribute [rw] callback
#   @return [Hash, nil]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
SelfAdminUpdateData = Struct.new(
  :callback,
  :settings,
  keyword_init: true
)

# Template entity data model.
#
# @!attribute [rw] channelData
#   @return [Hash, nil]
#
# @!attribute [rw] content
#   @return [Hash, nil]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] designerUrl
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] occurredOn
#   @return [String]
#
# @!attribute [rw] options
#   @return [Hash, nil]
#
# @!attribute [rw] reviews
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] template
#   @return [Hash]
#
# @!attribute [rw] templateId
#   @return [String]
#
# @!attribute [rw] updatedOn
#   @return [String, nil]
#
# @!attribute [rw] variables
#   @return [Array, nil]
Template = Struct.new(
  :channelData,
  :content,
  :createdOn,
  :designerUrl,
  :details,
  :id,
  :meta,
  :occurredOn,
  :options,
  :reviews,
  :status,
  :template,
  :templateId,
  :updatedOn,
  :variables,
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
# @!attribute [rw] page_index
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
TemplateListMatch = Struct.new(
  :page_index,
  :page_size,
  :sort,
  keyword_init: true
)

# Request payload for Template#create.
#
# @!attribute [rw] channelData
#   @return [Hash, nil]
#
# @!attribute [rw] content
#   @return [Hash, nil]
#
# @!attribute [rw] createdOn
#   @return [String]
#
# @!attribute [rw] designerUrl
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] occurredOn
#   @return [String]
#
# @!attribute [rw] options
#   @return [Hash, nil]
#
# @!attribute [rw] reviews
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] template
#   @return [Hash]
#
# @!attribute [rw] templateId
#   @return [String]
#
# @!attribute [rw] updatedOn
#   @return [String, nil]
#
# @!attribute [rw] variables
#   @return [Array, nil]
TemplateCreateData = Struct.new(
  :channelData,
  :content,
  :createdOn,
  :designerUrl,
  :details,
  :id,
  :meta,
  :occurredOn,
  :options,
  :reviews,
  :status,
  :template,
  :templateId,
  :updatedOn,
  :variables,
  keyword_init: true
)

# Request payload for Template#update.
#
# @!attribute [rw] channel_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] channelData
#   @return [Hash, nil]
#
# @!attribute [rw] content
#   @return [Hash, nil]
#
# @!attribute [rw] createdOn
#   @return [String, nil]
#
# @!attribute [rw] designerUrl
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] occurredOn
#   @return [String, nil]
#
# @!attribute [rw] options
#   @return [Hash, nil]
#
# @!attribute [rw] reviews
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] template
#   @return [Hash, nil]
#
# @!attribute [rw] templateId
#   @return [String, nil]
#
# @!attribute [rw] updatedOn
#   @return [String, nil]
#
# @!attribute [rw] variables
#   @return [Array, nil]
TemplateUpdateData = Struct.new(
  :channel_id,
  :id,
  :channelData,
  :content,
  :createdOn,
  :designerUrl,
  :details,
  :meta,
  :occurredOn,
  :options,
  :reviews,
  :status,
  :template,
  :templateId,
  :updatedOn,
  :variables,
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
# @!attribute [rw] files
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] path
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
TrafficFile = Struct.new(
  :files,
  :id,
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
# @!attribute [rw] files
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
TrafficFileListMatch = Struct.new(
  :files,
  :id,
  :path,
  :url,
  keyword_init: true
)

# Variable entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] examples
#   @return [Array, nil]
#
# @!attribute [rw] formats
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
# @!attribute [rw] variables
#   @return [Array]
Variable = Struct.new(
  :description,
  :examples,
  :formats,
  :name,
  :ref,
  :type,
  :variables,
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
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] examples
#   @return [Array, nil]
#
# @!attribute [rw] formats
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
# @!attribute [rw] variables
#   @return [Array]
VariableCreateData = Struct.new(
  :template_id,
  :description,
  :examples,
  :formats,
  :name,
  :ref,
  :type,
  :variables,
  keyword_init: true
)

# Request payload for Variable#update.
#
# @!attribute [rw] template_id
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] examples
#   @return [Array, nil]
#
# @!attribute [rw] formats
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] ref
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] variables
#   @return [Array, nil]
VariableUpdateData = Struct.new(
  :template_id,
  :description,
  :examples,
  :formats,
  :name,
  :ref,
  :type,
  :variables,
  keyword_init: true
)

