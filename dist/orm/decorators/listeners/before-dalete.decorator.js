"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeforeDelete = void 0;
var orm_constant_1 = require("../../orm.constant");
var decorator_utils_1 = require("../../utils/decorator.utils");
function BeforeDelete() {
    return function (target, propertyKey, descriptor) {
        var hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.BEFORE_DELETE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.BEFORE_DELETE, hookFuncLikeArray, target);
        var before_delete = (0, decorator_utils_1.getOptions)(target).before_delete;
        if (!before_delete) {
            (0, decorator_utils_1.addOptions)(target, {
                before_save: (0, decorator_utils_1.addHookFunction)(target, orm_constant_1.BEFORE_DELETE),
            });
        }
        return descriptor;
    };
}
exports.BeforeDelete = BeforeDelete;
//# sourceMappingURL=before-dalete.decorator.js.map