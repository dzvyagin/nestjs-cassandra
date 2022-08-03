"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterDelete = void 0;
var orm_constant_1 = require("../../orm.constant");
var decorator_utils_1 = require("../../utils/decorator.utils");
function AfterDelete() {
    return function (target, propertyKey, descriptor) {
        var hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.AFTER_DELETE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.AFTER_DELETE, hookFuncLikeArray, target);
        var after_delete = (0, decorator_utils_1.getOptions)(target).after_delete;
        if (!after_delete) {
            (0, decorator_utils_1.addOptions)(target, {
                before_save: (0, decorator_utils_1.addHookFunction)(target, orm_constant_1.AFTER_DELETE),
            });
        }
        return descriptor;
    };
}
exports.AfterDelete = AfterDelete;
//# sourceMappingURL=after-delete.decorator.js.map