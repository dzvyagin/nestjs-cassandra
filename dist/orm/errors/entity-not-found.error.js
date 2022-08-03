"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundError = void 0;
var EntityNotFoundError = /** @class */ (function (_super) {
    __extends(EntityNotFoundError, _super);
    function EntityNotFoundError(entityClass, query) {
        var _this = _super.call(this) || this;
        _this.name = 'apollo.model.find.entitynotfound';
        Object.setPrototypeOf(_this, EntityNotFoundError.prototype);
        var targetName;
        if (typeof entityClass === 'function') {
            targetName = entityClass.name;
        }
        else {
            targetName = entityClass;
        }
        var queryString = _this.stringifyQuery(query);
        _this.message = "Could not find any entity of type \"".concat(targetName, "\" matching: ").concat(queryString);
        return _this;
    }
    EntityNotFoundError.prototype.stringifyQuery = function (query) {
        try {
            return JSON.stringify(query, null, 4);
            // tslint:disable-next-line:no-empty
        }
        catch (e) { }
        return '' + query;
    };
    return EntityNotFoundError;
}(Error));
exports.EntityNotFoundError = EntityNotFoundError;
//# sourceMappingURL=entity-not-found.error.js.map