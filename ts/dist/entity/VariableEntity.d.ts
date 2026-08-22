import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Variable, VariableListMatch, VariableCreateData, VariableUpdateData } from '../LmMultichannelTypes';
declare class VariableEntity extends LmMultichannelEntityBase<Variable> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: VariableEntity): VariableEntity;
    list(this: any, reqmatch?: VariableListMatch, ctrl?: Control): Promise<VariableEntity[]>;
    create(this: any, reqdata?: VariableCreateData, ctrl?: Control): Promise<VariableEntity>;
    update(this: any, reqdata?: VariableUpdateData, ctrl?: Control): Promise<VariableEntity>;
}
export { VariableEntity };
