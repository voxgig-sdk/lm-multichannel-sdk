"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LmMultichannelError = void 0;
class LmMultichannelError extends Error {
    isLmMultichannelError = true;
    sdk = 'LmMultichannel';
    code;
    ctx;
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.LmMultichannelError = LmMultichannelError;
//# sourceMappingURL=LmMultichannelError.js.map