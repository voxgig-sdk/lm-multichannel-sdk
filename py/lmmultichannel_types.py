# Typed models for the LmMultichannel SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Content(TypedDict):
    content: dict


class ContentLoadMatch(TypedDict):
    template_id: str


class ContentCreateData(TypedDict):
    template_id: str


class Message(TypedDict):
    message: list
    schedule: dict


class MessageLoadMatch(TypedDict):
    id: str


class MessageCreateData(TypedDict):
    message: list
    schedule: dict


class MessageRemoveMatch(TypedDict):
    id: str


class MessageEvent(TypedDict):
    account_id: str
    event_id: str
    message_status_changed: dict
    on: str
    template_review_status_changed: dict
    user_message_received: dict


class MessageEventListMatch(TypedDict):
    id: str


class Option(TypedDict):
    option: dict


class OptionLoadMatch(TypedDict):
    template_id: str


class OptionCreateData(TypedDict):
    template_id: str


class OptionUpdateData(TypedDict):
    template_id: str


class Schedule(TypedDict):
    count: int


class ScheduleLoadMatch(TypedDict, total=False):
    count: int


class ScheduleRemoveMatch(TypedDict, total=False):
    count: int


class Self(TypedDict):
    account: dict


class SelfLoadMatch(TypedDict, total=False):
    account: dict


class SelfAdmin(TypedDict):
    setting: dict


class SelfAdminUpdateData(TypedDict, total=False):
    setting: dict


class TemplateRequired(TypedDict):
    created_on: str
    meta: dict
    occurred_on: str
    review: dict
    status: str
    template: dict
    template_id: str


class Template(TemplateRequired, total=False):
    channel_data: dict
    designer_url: str
    detail: str
    updated_on: str


class TemplateLoadMatchRequired(TypedDict):
    id: str


class TemplateLoadMatch(TemplateLoadMatchRequired, total=False):
    channel_id: str


class TemplateListMatch(TypedDict, total=False):
    channel_data: dict
    created_on: str
    designer_url: str
    detail: str
    meta: dict
    occurred_on: str
    review: dict
    status: str
    template: dict
    template_id: str
    updated_on: str


class TemplateCreateDataRequired(TypedDict):
    created_on: str
    meta: dict
    occurred_on: str
    review: dict
    status: str
    template: dict
    template_id: str


class TemplateCreateData(TemplateCreateDataRequired, total=False):
    channel_data: dict
    designer_url: str
    detail: str
    updated_on: str


class TemplateUpdateData(TypedDict):
    channel_id: str
    id: str


class TemplateRemoveMatchRequired(TypedDict):
    id: str


class TemplateRemoveMatch(TemplateRemoveMatchRequired, total=False):
    channel_id: str


class Traffic(TypedDict):
    pass


class TrafficRemoveMatch(TypedDict):
    path: str


class TrafficFile(TypedDict):
    file: list
    path: str
    url: str


class TrafficFileLoadMatch(TypedDict):
    id: str


class TrafficFileListMatch(TypedDict, total=False):
    file: list
    path: str
    url: str


class VariableRequired(TypedDict):
    name: str
    variable: list


class Variable(VariableRequired, total=False):
    description: str
    example: list
    format: list
    ref: str
    type: str


class VariableListMatch(TypedDict):
    template_id: str


class VariableCreateData(TypedDict):
    template_id: str


class VariableUpdateData(TypedDict):
    template_id: str
