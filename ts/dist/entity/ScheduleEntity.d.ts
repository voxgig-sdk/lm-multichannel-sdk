import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Schedule, ScheduleLoadMatch, ScheduleRemoveMatch } from '../LmMultichannelTypes';
declare class ScheduleEntity extends LmMultichannelEntityBase<Schedule> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: ScheduleEntity): ScheduleEntity;
    load(this: any, reqmatch?: ScheduleLoadMatch, ctrl?: Control): Promise<Schedule>;
    remove(this: any, reqmatch?: ScheduleRemoveMatch, ctrl?: Control): Promise<Schedule>;
}
export { ScheduleEntity };
