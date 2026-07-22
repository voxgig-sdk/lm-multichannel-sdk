// Typed models for the LmMultichannel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Content {
  content: Record<string, any>
}

export interface ContentLoadMatch {
  template_id: string
}

export interface ContentCreateData {
  template_id: string
}

export interface Message {
  message: any[]
  schedule: Record<string, any>
}

export interface MessageLoadMatch {
  id: string
}

export interface MessageCreateData {
  message: any[]
  schedule: Record<string, any>
}

export interface MessageRemoveMatch {
  id: string
}

export interface MessageEvent {
  account_id: string
  event_id: string
  message_status_changed: Record<string, any>
  on: string
  template_review_status_changed: Record<string, any>
  user_message_received: Record<string, any>
}

export interface MessageEventListMatch {
  id: string
}

export interface Option {
  option: Record<string, any>
}

export interface OptionLoadMatch {
  template_id: string
}

export interface OptionCreateData {
  template_id: string
}

export interface OptionUpdateData {
  template_id: string
}

export interface Schedule {
  count: number
}

export interface ScheduleLoadMatch {
  count?: number
}

export interface ScheduleRemoveMatch {
  count?: number
}

export interface Self {
  account: Record<string, any>
}

export interface SelfLoadMatch {
  account?: Record<string, any>
}

export interface SelfAdmin {
  setting: Record<string, any>
}

export interface SelfAdminUpdateData {
  setting?: Record<string, any>
}

export interface Template {
  channel_data?: Record<string, any>
  created_on: string
  designer_url?: string
  detail?: string
  meta: Record<string, any>
  occurred_on: string
  review: Record<string, any>
  status: string
  template: Record<string, any>
  template_id: string
  updated_on?: string
}

export interface TemplateLoadMatch {
  channel_id?: string
  id: string
}

export interface TemplateListMatch {
  channel_data?: Record<string, any>
  created_on?: string
  designer_url?: string
  detail?: string
  meta?: Record<string, any>
  occurred_on?: string
  review?: Record<string, any>
  status?: string
  template?: Record<string, any>
  template_id?: string
  updated_on?: string
}

export interface TemplateCreateData {
  channel_data?: Record<string, any>
  created_on: string
  designer_url?: string
  detail?: string
  meta: Record<string, any>
  occurred_on: string
  review: Record<string, any>
  status: string
  template: Record<string, any>
  template_id: string
  updated_on?: string
}

export interface TemplateUpdateData {
  channel_id: string
  id: string
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
  file: any[]
  path: string
  url: string
}

export interface TrafficFileLoadMatch {
  id: string
}

export interface TrafficFileListMatch {
  file?: any[]
  path?: string
  url?: string
}

export interface Variable {
  description?: string
  example?: any[]
  format?: any[]
  name: string
  ref?: string
  type?: string
  variable: any[]
}

export interface VariableListMatch {
  template_id: string
}

export interface VariableCreateData {
  template_id: string
}

export interface VariableUpdateData {
  template_id: string
}

