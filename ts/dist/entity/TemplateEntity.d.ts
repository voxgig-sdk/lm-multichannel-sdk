import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Template, TemplateLoadMatch, TemplateListMatch, TemplateCreateData, TemplateUpdateData, TemplateRemoveMatch } from '../LmMultichannelTypes';
declare class TemplateEntity extends LmMultichannelEntityBase<Template> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: TemplateEntity): TemplateEntity;
    load(this: any, reqmatch?: TemplateLoadMatch, ctrl?: Control): Promise<TemplateEntity>;
    list(this: any, reqmatch?: TemplateListMatch, ctrl?: Control): Promise<TemplateEntity[]>;
    create(this: any, reqdata?: TemplateCreateData, ctrl?: Control): Promise<TemplateEntity>;
    update(this: any, reqdata?: TemplateUpdateData, ctrl?: Control): Promise<TemplateEntity>;
    remove(this: any, reqmatch?: TemplateRemoveMatch, ctrl?: Control): Promise<TemplateEntity>;
}
export { TemplateEntity };
