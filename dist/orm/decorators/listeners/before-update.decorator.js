"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeforeUpdate = void 0;
var orm_constant_1 = require("../../orm.constant");
var decorator_utils_1 = require("../../utils/decorator.utils");
function BeforeUpdate() {
    return function (target, propertyKey, descriptor) {
        var hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.BEFORE_UPDATE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.BEFORE_UPDATE, hookFuncLikeArray, target);
        var before_update = (0, decorator_utils_1.getOptions)(target).before_update;
        if (!before_update) {
            (0, decorator_utils_1.addOptions)(target, {
                before_save: (0, decorator_utils_1.addHookFunction)(target, orm_constant_1.BEFORE_UPDATE),
            });
        }
        return descriptor;
    };
}
exports.BeforeUpdate = BeforeUpdate;
//# sourceMappingURL=before-update.decorator.js.map