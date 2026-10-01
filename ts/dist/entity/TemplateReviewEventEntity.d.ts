import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { TemplateReviewEvent, TemplateReviewEventListMatch } from '../LmMultichannelTypes';
declare class TemplateReviewEventEntity extends LmMultichannelEntityBase<TemplateReviewEvent> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: TemplateReviewEventEntity): TemplateReviewEventEntity;
    list(this: any, reqmatch?: TemplateReviewEventListMatch, ctrl?: Control): Promise<TemplateReviewEventEntity[]>;
}
export { TemplateReviewEventEntity };
