import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Option, OptionLoadMatch, OptionCreateData, OptionUpdateData } from '../LmMultichannelTypes';
declare class OptionEntity extends LmMultichannelEntityBase<Option> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: OptionEntity): OptionEntity;
    load(this: any, reqmatch?: OptionLoadMatch, ctrl?: Control): Promise<OptionEntity>;
    create(this: any, reqdata?: OptionCreateData, ctrl?: Control): Promise<OptionEntity>;
    update(this: any, reqdata?: OptionUpdateData, ctrl?: Control): Promise<OptionEntity>;
}
export { OptionEntity };
