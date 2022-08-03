"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterUpdate = void 0;
var orm_constant_1 = require("../../orm.constant");
var decorator_utils_1 = require("../../utils/decorator.utils");
function AfterUpdate() {
    return function (target, propertyKey, descriptor) {
        var hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.AFTER_UPDATE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.AFTER_UPDATE, hookFuncLikeArray, target);
        var after_update = (0, decorator_utils_1.getOptions)(target).after_update;
        if (!after_update) {
            (0, decorator_utils_1.addOptions)(target, {
                before_save: (0, decorator_utils_1.addHookFunction)(target, orm_constant_1.AFTER_UPDATE),
            });
        }
        return descriptor;
    };
}
exports.AfterUpdate = AfterUpdate;
//# sourceMappingURL=after-update.decorator.js.map