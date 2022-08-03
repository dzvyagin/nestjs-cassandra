"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnQueryBuilder = void 0;
var ReturnQueryBuilder = /** @class */ (function () {
    function ReturnQueryBuilder(model) {
        this.model = model;
    }
    ReturnQueryBuilder.prototype.save = function (model, options) {
        if (options === void 0) { options = {}; }
        return new this.model(model).save(__assign(__assign({}, options), { return_query: true }));
    };
    ReturnQueryBuilder.prototype.update = function (query, updateValue, options) {
        if (query === void 0) { query = {}; }
        if (options === void 0) { options = {}; }
        return this.model.update(query, updateValue, __assign(__assign({}, options), { return_query: true }));
    };
    ReturnQueryBuilder.prototype.delete = function (query, options) {
        if (query === void 0) { query = {}; }
        if (options === void 0) { options = {}; }
        return this.model.delete(query, __assign(__assign({}, options), { return_query: true }));
    };
    return ReturnQueryBuilder;
}());
exports.ReturnQueryBuilder = ReturnQueryBuilder;
//# sourceMappingURL=return-query.builder.js.map