import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { SelfAdmin, SelfAdminUpdateData } from '../LmMultichannelTypes';
declare class SelfAdminEntity extends LmMultichannelEntityBase<SelfAdmin> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: SelfAdminEntity): SelfAdminEntity;
    update(this: any, reqdata?: SelfAdminUpdateData, ctrl?: Control): Promise<SelfAdminEntity>;
}
export { SelfAdminEntity };
