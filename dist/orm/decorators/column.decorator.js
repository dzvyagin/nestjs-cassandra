"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexColumn = exports.UpdateDateColumn = exports.CreateDateColumn = exports.VersionColumn = exports.GeneratedUUidColumn = exports.Column = void 0;
var decorator_utils_1 = require("../utils/decorator.utils");
var listeners_1 = require("./listeners");
var db_utils_1 = require("../utils/db.utils");
function Column(options) {
    return function (target, propertyName) {
        (0, decorator_utils_1.addAttribute)(target, propertyName, options);
    };
}
exports.Column = Column;
function GeneratedUUidColumn(type) {
    if (type === void 0) { type = 'uuid'; }
    return function (target, propertyName) {
        var fn = {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var instance = args[0];
                if (instance !== null && !instance[propertyName]) {
                    instance[propertyName] = type === 'timeuuid' ? (0, db_utils_1.timeuuid)() : (0, db_utils_1.uuid)();
                }
            },
        };
        Column({
            type: type,
            default: { $db_function: type === 'timeuuid' ? 'now()' : 'uuid()' },
        })(target, propertyName);
        (0, listeners_1.BeforeSave)()(target, propertyName, fn);
    };
}
exports.GeneratedUUidColumn = GeneratedUUidColumn;
function VersionColumn() {
    return function (target, propertyName) {
        (0, decorator_utils_1.addOptions)(target, { options: { versions: { key: propertyName } } });
    };
}
exports.VersionColumn = VersionColumn;
function CreateDateColumn() {
    return function (target, propertyName) {
        (0, decorator_utils_1.addOptions)(target, {
            options: { timestamps: { createdAt: propertyName } },
        });
    };
}
exports.CreateDateColumn = CreateDateColumn;
function UpdateDateColumn() {
    return function (target, propertyName) {
        (0, decorator_utils_1.addOptions)(target, {
            options: { timestamps: { updatedAt: propertyName } },
        });
    };
}
exports.UpdateDateColumn = UpdateDateColumn;
function IndexColumn() {
    return function (target, propertyName) {
        var indexes = (0, decorator_utils_1.getOptions)(target).indexes;
        indexes = indexes || [];
        var isAdded = indexes.some(function (value) { return value === propertyName; });
        if (isAdded) {
            return;
        }
        indexes.push(propertyName);
        (0, decorator_utils_1.addOptions)(target, { indexes: indexes });
    };
}
exports.IndexColumn = IndexColumn;
//# sourceMappingURL=column.decorator.js.map