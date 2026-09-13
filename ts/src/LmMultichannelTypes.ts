// Typed models for the LmMultichannel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Content {
  card?: Record<string, any>
  carousel: Record<string, any>
  content: Record<string, any>
  fromTemplate: Record<string, any>
  location: Record<string, any>
  media: Record<string, any>
  suggestions?: any[]
  text?: string
}

export interface ContentLoadMatch {
  template_id: string
}

export interface ContentCreateData {
  template_id: string
  card?: Record<string, any>
  carousel: Record<string, any>
  content: Record<string, any>
  fromTemplate: Record<string, any>
  location: Record<string, any>
  media: Record<string, any>
  suggestions?: any[]
  text?: string
}

export interface Message {
  campaignId?: string
  id?: string
  messages: any[]
  scheduleAt: string
}

export interface MessageLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'schedule'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MessageCreateData {
  campaignId?: string
  id?: string
  messages: any[]
  scheduleAt: string
}

export interface MessageRemoveMatch {
  id: string

  // Selects a custom action instead of the plain remove:
  //   'schedule'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MessageEvent {
  accountId: string
  eventId: string
  id?: string
  messageStatusChanged: Record<string, any>
  on: string
  templateReviewStatusChanged: Record<string, any>
  userMessageReceived: Record<string, any>
}

export interface MessageEventListMatch {
  id: string
  page_index?: number
  page_size?: number
  sort?: string
}

export interface Option {
  options: Record<string, any>
}

export interface OptionLoadMatch {
  template_id: string
}

export interface OptionCreateData {
  template_id: string
  options: Record<string, any>
}

export interface OptionUpdateData {
  template_id: string
  options?: Record<string, any>
}

export interface Schedule {
  count: number
}

export interface ScheduleLoadMatch {
  between?: string
  campaign_id?: string
  time_zone?: string
}

export interface ScheduleRemoveMatch {
  between?: string
  campaign_id?: string
  time_zone?: string
}

export interface Self {
  accountId: string
  settings: Record<string, any>
}

export interface SelfLoadMatch {
  accountId?: string
  settings?: Record<string, any>
}

export interface SelfAdmin {
  callback: Record<string, any>
  settings: Record<string, any>
}

export interface SelfAdminUpdateData {
  callback?: Record<string, any>
  settings?: Record<string, any>
}

export interface Template {
  channelData?: Record<string, any>
  content?: Record<string, any>
  createdOn: string
  designerUrl?: string
  details?: string
  id?: string
  meta?: Record<string, any>
  occurredOn: string
  options?: Record<string, any>
  reviews?: Record<string, any>
  status: string
  template: Record<string, any>
  templateId: string
  updatedOn?: string
  variables?: any[]
}

export interface TemplateLoadMatch {
  channel_id?: string
  id: string

  // Selects a custom action instead of the plain load:
  //   'meta' | 'review'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TemplateListMatch {
  page_index?: number
  page_size?: number
  sort?: string
}

export interface TemplateCreateData {
  channelData?: Record<string, any>
  content?: Record<string, any>
  createdOn: string
  designerUrl?: string
  details?: string
  id?: string
  meta?: Record<string, any>
  occurredOn: string
  options?: Record<string, any>
  reviews?: Record<string, any>
  status: string
  template: Record<string, any>
  templateId: string
  updatedOn?: string
  variables?: any[]

  // Selects a custom action instead of the plain create:
  //   'meta'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TemplateUpdateData {
  channel_id: string
  id: string
  channelData?: Record<string, any>
  content?: Record<string, any>
  createdOn?: string
  designerUrl?: string
  details?: string
  meta?: Record<string, any>
  occurredOn?: string
  options?: Record<string, any>
  reviews?: Record<string, any>
  status?: string
  template?: Record<string, any>
  templateId?: string
  updatedOn?: string
  variables?: any[]
}

export interface TemplateRemoveMatch {
  channel_id?: string
  id: string
}

export interface Traffic {
}

export interface TrafficRemoveMatch {
  path: string
}

export interface TrafficFile {
  files: any[]
  id?: string
  path: string
  url: string
}

export interface TrafficFileLoadMatch {
  id: string
}

export interface TrafficFileListMatch {
  files?: any[]
  id?: string
  path?: string
  url?: string
}

export interface Variable {
  description?: string
  examples?: any[]
  formats?: any[]
  name: string
  ref?: string
  type?: string
  variables: any[]
}

export interface VariableListMatch {
  template_id: string
}

export interface VariableCreateData {
  template_id: string
  description?: string
  examples?: any[]
  formats?: any[]
  name: string
  ref?: string
  type?: string
  variables: any[]
}

export interface VariableUpdateData {
  template_id: string
  description?: string
  examples?: any[]
  formats?: any[]
  name?: string
  ref?: string
  type?: string
  variables?: any[]
}

