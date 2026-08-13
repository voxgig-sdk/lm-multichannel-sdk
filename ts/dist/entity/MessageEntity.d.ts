import { LmMultichannelEntityBase } from '../LmMultichannelEntityBase';
import type { LmMultichannelSDK } from '../LmMultichannelSDK';
import type { Control } from '../types';
import type { Message, MessageLoadMatch, MessageCreateData, MessageRemoveMatch } from '../LmMultichannelTypes';
declare class MessageEntity extends LmMultichannelEntityBase<Message> {
    constructor(client: LmMultichannelSDK, entopts: any);
    make(this: MessageEntity): MessageEntity;
    load(this: any, reqmatch?: MessageLoadMatch, ctrl?: Control): Promise<Message>;
    create(this: any, reqdata?: MessageCreateData, ctrl?: Control): Promise<Message>;
    remove(this: any, reqmatch?: MessageRemoveMatch, ctrl?: Control): Promise<Message>;
}
export { MessageEntity };
