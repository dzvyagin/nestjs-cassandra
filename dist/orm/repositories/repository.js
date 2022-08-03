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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var transform_entity_utils_1 = require("../utils/transform-entity.utils");
var errors_1 = require("../errors");
var defaultOptions = {
    findOptions: { raw: true },
    updateOptions: { if_exists: true },
    deleteOptions: { if_exists: true },
};
var Repository = /** @class */ (function () {
    function Repository() {
    }
    Repository.prototype.create = function (entityLike) {
        return (0, transform_entity_utils_1.transformEntity)(this.target, entityLike);
    };
    Repository.prototype.findOne = function (query, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return (0, rxjs_1.defer)(function () {
            return _this.model.findOneAsync(query, __assign(__assign({}, options), defaultOptions.findOptions));
        }).pipe((0, operators_1.map)(function (x) { return x && (0, transform_entity_utils_1.transformEntity)(_this.target, x); }));
    };
    Repository.prototype.findOneOrFail = function (query, maybeOptions) {
        var _this = this;
        if (maybeOptions === void 0) { maybeOptions = {}; }
        return this.findOne(query, maybeOptions).pipe((0, operators_1.map)(function (entity) {
            if (entity === undefined) {
                throw new errors_1.EntityNotFoundError(_this.target, query);
            }
            return entity;
        }));
    };
    Repository.prototype.find = function (query, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return (0, rxjs_1.defer)(function () {
            return _this.model.findAsync(query, __assign(__assign({}, options), defaultOptions.findOptions));
        }).pipe((0, operators_1.map)(function (x) { return (0, transform_entity_utils_1.transformEntity)(_this.target, x); }));
    };
    Repository.prototype.findAndCount = function (query, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return (0, rxjs_1.defer)(function () {
            return _this.model.findAsync(query, __assign(__assign({}, options), defaultOptions.findOptions));
        }).pipe((0, operators_1.map)(function (x) { return (0, transform_entity_utils_1.transformEntity)(_this.target, x); }), (0, operators_1.map)(function (entities) { return [entities, entities.length]; }));
    };
    Repository.prototype.save = function (entityLike, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var saveFunc = function (entity) { return __awaiter(_this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = new this.model(entity);
                        return [4 /*yield*/, model.saveAsync(options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, (0, transform_entity_utils_1.transformEntity)(this.target, model.toJSON())];
                }
            });
        }); };
        var saveMultipleFunc = function (arrayLike) {
            return Promise.all(arrayLike.map(function (x) { return saveFunc(x); }));
        };
        return Array.isArray(entityLike)
            ? (0, rxjs_1.defer)(function () { return saveMultipleFunc(entityLike); })
            : (0, rxjs_1.defer)(function () { return saveFunc(entityLike); });
    };
    Repository.prototype.update = function (query, updateValue, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return (0, rxjs_1.defer)(function () {
            return _this.model.updateAsync(query, updateValue, __assign(__assign({}, defaultOptions.updateOptions), options));
        });
    };
    Repository.prototype.remove = function (entityOrEntities, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var removeFunc = function (entity) {
            return new _this.model(entity).deleteAsync(__assign(__assign({}, defaultOptions.deleteOptions), options));
        };
        var promiseArray = entityOrEntities instanceof Array
            ? entityOrEntities.map(function (x) { return removeFunc(x); })
            : [removeFunc(entityOrEntities)];
        return (0, rxjs_1.defer)(function () { return Promise.all(promiseArray); }).pipe((0, operators_1.map)(function () { return entityOrEntities; }));
    };
    Repository.prototype.delete = function (query, options) {
        var _this = this;
        if (query === void 0) { query = {}; }
        if (options === void 0) { options = {}; }
        return (0, rxjs_1.defer)(function () {
            return _this.model.deleteAsync(query, __assign(__assign({}, defaultOptions.deleteOptions), options));
        });
    };
    Repository.prototype.truncate = function () {
        var _this = this;
        return (0, rxjs_1.defer)(function () { return _this.model.truncateAsync(); });
    };
    Repository.prototype.stream = function (query, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var reader$ = new rxjs_1.Subject();
        var onRead = function (reader) {
            while (true) {
                var row = reader.readRow();
                if (row === null) {
                    break;
                }
                reader$.next((0, transform_entity_utils_1.transformEntity)(_this.target, row));
            }
        };
        var onDone = function (error) {
            if (error) {
                reader$.error(error);
            }
            reader$.complete();
            return;
        };
        this.model.stream(query, __assign(__assign({}, options), defaultOptions.findOptions), onRead, onDone);
        return reader$.asObservable();
    };
    Repository.prototype.eachRow = function (query, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var reader$ = new rxjs_1.Subject();
        var done$ = new rxjs_1.Subject();
        var getReader = function () { return reader$.asObservable(); };
        var getDone = function () { return done$.asObservable(); };
        var onRow = function (_n, row) {
            return reader$.next((0, transform_entity_utils_1.transformEntity)(_this.target, row));
        };
        var onDone = function (err, result) {
            if (err) {
                reader$.error(err);
                done$.error(err);
            }
            else {
                done$.next(result);
            }
            reader$.complete();
            done$.complete();
        };
        this.model.eachRow(query, __assign(__assign({}, options), defaultOptions.findOptions), onRow, onDone);
        return { getReader: getReader, getDone: getDone };
    };
    Object.defineProperty(Repository.prototype, "getModelRef", {
        get: function () {
            return this.model;
        },
        enumerable: false,
        configurable: true
    });
    Repository.prototype.getReturnQueryBuilder = function () {
        return this.returnQueryBuilder;
    };
    Repository.prototype.doBatch = function (queries) {
        return this.model.execute_batchAsync(queries);
    };
    return Repository;
}());
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map