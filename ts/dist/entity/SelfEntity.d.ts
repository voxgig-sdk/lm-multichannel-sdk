import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Self, SelfLoadMatch } from '../LmMultichannelTypes';
declare class SelfEntity extends LmMultichannelEntityBase<Self> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: SelfEntity): SelfEntity;
    load(this: any, reqmatch?: SelfLoadMatch, ctrl?: Control): Promise<SelfEntity>;
}
export { SelfEntity };
