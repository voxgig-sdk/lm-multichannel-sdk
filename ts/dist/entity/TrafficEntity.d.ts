import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Traffic, TrafficListMatch, TrafficRemoveMatch } from '../LmMultichannelTypes';
declare class TrafficEntity extends LmMultichannelEntityBase<Traffic> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: TrafficEntity): TrafficEntity;
    list(this: any, reqmatch?: TrafficListMatch, ctrl?: Control): Promise<TrafficEntity[]>;
    remove(this: any, reqmatch?: TrafficRemoveMatch, ctrl?: Control): Promise<TrafficEntity>;
}
export { TrafficEntity };
