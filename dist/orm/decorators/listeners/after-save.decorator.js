"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterSave = void 0;
var orm_constant_1 = require("../../orm.constant");
var decorator_utils_1 = require("../../utils/decorator.utils");
function AfterSave() {
    return function (target, propertyKey, descriptor) {
        var hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.AFTER_SAVE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.AFTER_SAVE, hookFuncLikeArray, target);
        var after_save = (0, decorator_utils_1.getOptions)(target).after_save;
        if (!after_save) {
            (0, decorator_utils_1.addOptions)(target, { after_save: (0, decorator_utils_1.addHookFunction)(target, orm_constant_1.AFTER_SAVE) });
        }
        return descriptor;
    };
}
exports.AfterSave = AfterSave;
//# sourceMappingURL=after-save.decorator.js.map