import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { TrafficFile, TrafficFileLoadMatch } from '../LmMultichannelTypes';
declare class TrafficFileEntity extends LmMultichannelEntityBase<TrafficFile> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: TrafficFileEntity): TrafficFileEntity;
    load(this: any, reqmatch?: TrafficFileLoadMatch, ctrl?: Control): Promise<TrafficFileEntity>;
}
export { TrafficFileEntity };
