import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Traffic, TrafficRemoveMatch } from '../LmMultichannelTypes';
declare class TrafficEntity extends LmMultichannelEntityBase<Traffic> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: TrafficEntity): TrafficEntity;
    remove(this: any, reqmatch?: TrafficRemoveMatch, ctrl?: Control): Promise<Traffic>;
}
export { TrafficEntity };
