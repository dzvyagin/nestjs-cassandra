"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityMethod = void 0;
var decorator_utils_1 = require("../utils/decorator.utils");
function EntityMethod() {
    return function (target, propertyKey, descriptor) {
        var methods = (0, decorator_utils_1.getOptions)(target).methods;
        methods = methods || {};
        methods[propertyKey] = descriptor.value;
        (0, decorator_utils_1.addOptions)(target, { methods: methods });
        return descriptor;
    };
}
exports.EntityMethod = EntityMethod;
//# sourceMappingURL=entity-method.decorator.js.map