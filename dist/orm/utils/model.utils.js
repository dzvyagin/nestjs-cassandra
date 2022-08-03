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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = exports.loadModel = void 0;
var decorator_utils_1 = require("./decorator.utils");
var common_1 = require("@nestjs/common");
function loadModel(connection, entity) {
    var schema = getSchema(entity);
    var modelName = entity.name || entity.table_name;
    var model = connection.loadSchema(modelName, schema);
    return new Promise(function (resolve) {
        model.syncDB(function (err) {
            if (err) {
                common_1.Logger.error(err.message, err.stack, 'CassandraModule');
                return resolve(model);
            }
            return resolve(model);
        });
    });
}
exports.loadModel = loadModel;
function getSchema(entity) {
    var attributes = (0, decorator_utils_1.getAttributes)(entity.prototype);
    var _a = (0, decorator_utils_1.getOptions)(entity.prototype), instanceMethods = _a.instanceMethods, classMethods = _a.classMethods, options = __rest(_a, ["instanceMethods", "classMethods"]);
    var model = __assign({}, options);
    model.fields = __assign({}, attributes);
    return model;
}
exports.getSchema = getSchema;
//# sourceMappingURL=model.utils.js.map