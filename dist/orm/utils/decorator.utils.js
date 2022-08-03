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
exports.addHookFunction = exports.addOptions = exports.setOptions = exports.getOptions = exports.addAttributeOptions = exports.addAttribute = exports.setAttributes = exports.getAttributes = exports.getEntityName = exports.setEntityName = exports.getEntity = exports.setEntity = void 0;
require("reflect-metadata");
var orm_constant_1 = require("../orm.constant");
var deep_merge_utils_1 = require("./deep-merge.utils");
function setEntity(target, entity) {
    Reflect.defineMetadata(orm_constant_1.ENTITY_METADATA, entity, target);
}
exports.setEntity = setEntity;
function getEntity(target) {
    return Reflect.getMetadata(orm_constant_1.ENTITY_METADATA, target);
}
exports.getEntity = getEntity;
function setEntityName(target, modelName) {
    Reflect.defineMetadata(orm_constant_1.ENTITY_NAME_KEY, modelName, target);
}
exports.setEntityName = setEntityName;
function getEntityName(target) {
    return Reflect.getMetadata(orm_constant_1.ENTITY_NAME_KEY, target);
}
exports.getEntityName = getEntityName;
function getAttributes(target) {
    var attributes = Reflect.getMetadata(orm_constant_1.ATTRUBUTE_KEY, target);
    if (attributes) {
        return Object.keys(attributes).reduce(function (copy, key) {
            copy[key] = __assign({}, attributes[key]);
            return copy;
        }, {});
    }
}
exports.getAttributes = getAttributes;
function setAttributes(target, attributes) {
    Reflect.defineMetadata(orm_constant_1.ATTRUBUTE_KEY, __assign({}, attributes), target);
}
exports.setAttributes = setAttributes;
function addAttribute(target, name, options) {
    var attributes = getAttributes(target) || {};
    attributes[name] = __assign({}, options);
    setAttributes(target, attributes);
}
exports.addAttribute = addAttribute;
function addAttributeOptions(target, propertyName, options) {
    var attributes = getAttributes(target);
    attributes[propertyName] = (0, deep_merge_utils_1.mergeDeep)(attributes[propertyName], options);
    setAttributes(target, attributes);
}
exports.addAttributeOptions = addAttributeOptions;
function getOptions(target) {
    var options = Reflect.getMetadata(orm_constant_1.OPTIONS_KEY, target);
    return __assign({}, options) || {};
}
exports.getOptions = getOptions;
function setOptions(target, options) {
    Reflect.defineMetadata(orm_constant_1.OPTIONS_KEY, __assign({}, options), target);
}
exports.setOptions = setOptions;
function addOptions(target, options) {
    var mOptions = getOptions(target) || {};
    setOptions(target, (0, deep_merge_utils_1.mergeDeep)(mOptions, options));
}
exports.addOptions = addOptions;
var addHookFunction = function (target, metadataKey) {
    var funcLikeArray = Reflect.getMetadata(metadataKey, target) || [];
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return funcLikeArray.map(function (funcLike) { return funcLike.apply(void 0, args); });
    };
};
exports.addHookFunction = addHookFunction;
//# sourceMappingURL=decorator.utils.js.map