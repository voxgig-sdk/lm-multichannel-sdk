import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { MessageEvent, MessageEventListMatch } from '../LmMultichannelTypes';
declare class MessageEventEntity extends LmMultichannelEntityBase<MessageEvent> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: MessageEventEntity): MessageEventEntity;
    list(this: any, reqmatch?: MessageEventListMatch, ctrl?: Control): Promise<MessageEventEntity[]>;
}
export { MessageEventEntity };
