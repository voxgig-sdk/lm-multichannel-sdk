import { ContentEntity } from './entity/ContentEntity';
import { MessageEntity } from './entity/MessageEntity';
import { MessageEventEntity } from './entity/MessageEventEntity';
import { OptionEntity } from './entity/OptionEntity';
import { ScheduleEntity } from './entity/ScheduleEntity';
import { SelfEntity } from './entity/SelfEntity';
import { SelfAdminEntity } from './entity/SelfAdminEntity';
import { TemplateEntity } from './entity/TemplateEntity';
import { TrafficEntity } from './entity/TrafficEntity';
import { TrafficFileEntity } from './entity/TrafficFileEntity';
import { VariableEntity } from './entity/VariableEntity';
export type * from './LmMultichannelTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LmMultichannelEntityBase } from './LmMultichannelEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LmMultichannelSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Content(entopts?: Record<string, any>): ContentEntity;
    Message(entopts?: Record<string, any>): MessageEntity;
    MessageEvent(entopts?: Record<string, any>): MessageEventEntity;
    Option(entopts?: Record<string, any>): OptionEntity;
    Schedule(entopts?: Record<string, any>): ScheduleEntity;
    Self(entopts?: Record<string, any>): SelfEntity;
    SelfAdmin(entopts?: Record<string, any>): SelfAdminEntity;
    Template(entopts?: Record<string, any>): TemplateEntity;
    Traffic(entopts?: Record<string, any>): TrafficEntity;
    TrafficFile(entopts?: Record<string, any>): TrafficFileEntity;
    Variable(entopts?: Record<string, any>): VariableEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LmMultichannelSDK;
    tester(testopts?: any, sdkopts?: any): LmMultichannelSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LmMultichannelSDK;
export { stdutil, config, BaseFeature, LmMultichannelEntityBase, LmMultichannelSDK, SDK, };
