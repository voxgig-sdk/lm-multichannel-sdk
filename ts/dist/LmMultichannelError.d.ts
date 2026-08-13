import { Context } from './Context';
declare class LmMultichannelError extends Error {
    isLmMultichannelError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    constructor(code: string, msg: string, ctx: Context);
}
export { LmMultichannelError };
