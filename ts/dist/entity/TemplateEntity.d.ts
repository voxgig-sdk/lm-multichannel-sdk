import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Template, TemplateLoadMatch, TemplateListMatch, TemplateCreateData, TemplateUpdateData, TemplateRemoveMatch } from '../LmMultichannelTypes';
declare class TemplateEntity extends LmMultichannelEntityBase<Template> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: TemplateEntity): TemplateEntity;
    load(this: any, reqmatch?: TemplateLoadMatch, ctrl?: Control): Promise<Template>;
    list(this: any, reqmatch?: TemplateListMatch, ctrl?: Control): Promise<Template[]>;
    create(this: any, reqdata?: TemplateCreateData, ctrl?: Control): Promise<Template>;
    update(this: any, reqdata?: TemplateUpdateData, ctrl?: Control): Promise<Template>;
    remove(this: any, reqmatch?: TemplateRemoveMatch, ctrl?: Control): Promise<Template>;
}
export { TemplateEntity };
