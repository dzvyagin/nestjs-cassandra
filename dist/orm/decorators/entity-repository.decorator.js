"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityRepository = void 0;
var decorator_utils_1 = require("../utils/decorator.utils");
function EntityRepository(entity) {
    return function (target) {
        (0, decorator_utils_1.setEntity)(target, entity);
    };
}
exports.EntityRepository = EntityRepository;
//# sourceMappingURL=entity-repository.decorator.js.map