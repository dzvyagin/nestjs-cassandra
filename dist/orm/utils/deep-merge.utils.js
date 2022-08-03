"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = void 0;
var merge_deep_1 = __importDefault(require("merge-deep"));
function mergeDeep(target, sources) {
    return (0, merge_deep_1.default)(target, sources);
}
exports.mergeDeep = mergeDeep;
//# sourceMappingURL=deep-merge.utils.js.map