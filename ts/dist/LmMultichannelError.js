"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LmMultichannelError = void 0;
class LmMultichannelError extends Error {
    isLmMultichannelError = true;
    sdk = 'LmMultichannel';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.LmMultichannelError = LmMultichannelError;
//# sourceMappingURL=LmMultichannelError.js.map