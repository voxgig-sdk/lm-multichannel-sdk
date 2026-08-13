import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Content, ContentLoadMatch, ContentCreateData } from '../LmMultichannelTypes';
declare class ContentEntity extends LmMultichannelEntityBase<Content> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: ContentEntity): ContentEntity;
    load(this: any, reqmatch?: ContentLoadMatch, ctrl?: Control): Promise<Content>;
    create(this: any, reqdata?: ContentCreateData, ctrl?: Control): Promise<Content>;
}
export { ContentEntity };
