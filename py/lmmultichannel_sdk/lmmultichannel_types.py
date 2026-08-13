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


class ContentRequired(TypedDict):
    carousel: dict
    content: dict
    fromTemplate: dict
    location: dict
    media: dict


class Content(ContentRequired, total=False):
    card: dict
    suggestions: list
    text: str


class ContentLoadMatch(TypedDict):
    template_id: str


class ContentCreateDataRequired(TypedDict):
    template_id: str
    carousel: dict
    content: dict
    fromTemplate: dict
    location: dict
    media: dict


class ContentCreateData(ContentCreateDataRequired, total=False):
    card: dict
    suggestions: list
    text: str


class MessageRequired(TypedDict):
    messages: list
    scheduleAt: str


class Message(MessageRequired, total=False):
    campaignId: str


class MessageLoadMatch(TypedDict):
    id: str


class MessageCreateDataRequired(TypedDict):
    messages: list
    scheduleAt: str


class MessageCreateData(MessageCreateDataRequired, total=False):
    campaignId: str


class MessageRemoveMatch(TypedDict):
    id: str


class MessageEvent(TypedDict):
    accountId: str
    eventId: str
    messageStatusChanged: dict
    on: str
    templateReviewStatusChanged: dict
    userMessageReceived: dict


class MessageEventListMatch(TypedDict):
    id: str


class Option(TypedDict):
    options: dict


class OptionLoadMatch(TypedDict):
    template_id: str


class OptionCreateData(TypedDict):
    template_id: str
    options: dict


class OptionUpdateDataRequired(TypedDict):
    template_id: str


class OptionUpdateData(OptionUpdateDataRequired, total=False):
    options: dict


class Schedule(TypedDict):
    count: int


class ScheduleLoadMatch(TypedDict, total=False):
    count: int


class ScheduleRemoveMatch(TypedDict, total=False):
    count: int


class Self(TypedDict):
    accountId: str
    settings: dict


class SelfLoadMatch(TypedDict, total=False):
    accountId: str
    settings: dict


class SelfAdmin(TypedDict):
    callback: dict
    settings: dict


class SelfAdminUpdateData(TypedDict, total=False):
    callback: dict
    settings: dict


class TemplateRequired(TypedDict):
    createdOn: str
    occurredOn: str
    status: str
    template: dict
    templateId: str


class Template(TemplateRequired, total=False):
    channelData: dict
    content: dict
    designerUrl: str
    details: str
    meta: dict
    options: dict
    reviews: dict
    updatedOn: str
    variables: list


class TemplateLoadMatchRequired(TypedDict):
    id: str


class TemplateLoadMatch(TemplateLoadMatchRequired, total=False):
    channel_id: str


class TemplateListMatch(TypedDict, total=False):
    channelData: dict
    content: dict
    createdOn: str
    designerUrl: str
    details: str
    meta: dict
    occurredOn: str
    options: dict
    reviews: dict
    status: str
    template: dict
    templateId: str
    updatedOn: str
    variables: list


class TemplateCreateDataRequired(TypedDict):
    createdOn: str
    occurredOn: str
    status: str
    template: dict
    templateId: str


class TemplateCreateData(TemplateCreateDataRequired, total=False):
    channelData: dict
    content: dict
    designerUrl: str
    details: str
    meta: dict
    options: dict
    reviews: dict
    updatedOn: str
    variables: list


class TemplateUpdateDataRequired(TypedDict):
    channel_id: str
    id: str


class TemplateUpdateData(TemplateUpdateDataRequired, total=False):
    channelData: dict
    content: dict
    createdOn: str
    designerUrl: str
    details: str
    meta: dict
    occurredOn: str
    options: dict
    reviews: dict
    status: str
    template: dict
    templateId: str
    updatedOn: str
    variables: list


class TemplateRemoveMatchRequired(TypedDict):
    id: str


class TemplateRemoveMatch(TemplateRemoveMatchRequired, total=False):
    channel_id: str


class Traffic(TypedDict):
    pass


class TrafficRemoveMatch(TypedDict):
    path: str


class TrafficFile(TypedDict):
    files: list
    path: str
    url: str


class TrafficFileLoadMatch(TypedDict):
    id: str


class TrafficFileListMatch(TypedDict, total=False):
    files: list
    path: str
    url: str


class VariableRequired(TypedDict):
    name: str
    variables: list


class Variable(VariableRequired, total=False):
    description: str
    examples: list
    formats: list
    ref: str
    type: str


class VariableListMatch(TypedDict):
    template_id: str


class VariableCreateDataRequired(TypedDict):
    template_id: str
    name: str
    variables: list


class VariableCreateData(VariableCreateDataRequired, total=False):
    description: str
    examples: list
    formats: list
    ref: str
    type: str


class VariableUpdateDataRequired(TypedDict):
    template_id: str


class VariableUpdateData(VariableUpdateDataRequired, total=False):
    description: str
    examples: list
    formats: list
    name: str
    ref: str
    type: str
    variables: list
