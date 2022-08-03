"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCassandraProviders = void 0;
var cassandra_orm_utils_1 = require("./utils/cassandra-orm.utils");
var rxjs_1 = require("rxjs");
var orm_1 = require("./orm");
var decorator_utils_1 = require("./orm/utils/decorator.utils");
var repository_factory_1 = require("./orm/repositories/repository.factory");
function createCassandraProviders(entities, connection) {
    var _this = this;
    var providerModel = function (entity) { return ({
        provide: (0, cassandra_orm_utils_1.getModelToken)(entity),
        useFactory: function (connectionLike) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, rxjs_1.defer)(function () { return (0, orm_1.loadModel)(connectionLike, entity); }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        inject: [(0, cassandra_orm_utils_1.getConnectionToken)(connection)],
    }); };
    var provideRepository = function (entity) { return ({
        provide: (0, cassandra_orm_utils_1.getRepositoryToken)(entity),
        useFactory: function (model) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, repository_factory_1.RepositoryFactory.create(entity, model)];
        }); }); },
        inject: [(0, cassandra_orm_utils_1.getModelToken)(entity)],
    }); };
    var provideCustomRepository = function (EntityRepository) {
        var entity = (0, decorator_utils_1.getEntity)(EntityRepository);
        return {
            provide: (0, cassandra_orm_utils_1.getRepositoryToken)(EntityRepository),
            useFactory: function (model) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, repository_factory_1.RepositoryFactory.create(entity, model, EntityRepository)];
            }); }); },
            inject: [(0, cassandra_orm_utils_1.getModelToken)(entity)],
        };
    };
    var providers = [];
    (entities || []).forEach(function (entity) {
        if (entity.prototype instanceof orm_1.Repository) {
            return providers.push(provideCustomRepository(entity));
        }
        return providers.push(providerModel(entity), provideRepository(entity));
    });
    return __spreadArray([], providers, true);
}
exports.createCassandraProviders = createCassandraProviders;
//# sourceMappingURL=cassandra.providers.js.map