"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareMethod = prepareMethod;
function prepareMethod(ctx) {
    const op = ctx.op;
    const opname = op.name;
    let key = opname;
    const methodMap = {
        create: 'POST',
        update: 'PUT',
        load: 'GET',
        list: 'GET',
        remove: 'DELETE',
        patch: 'PATCH',
    };
    return methodMap[key];
}
//# sourceMappingURL=PrepareMethodUtility.js.map