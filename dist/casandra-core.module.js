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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.CassandraCoreModule = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var cassandra_constant_1 = require("./cassandra.constant");
var cassandra_orm_utils_1 = require("./utils/cassandra-orm.utils");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var orm_1 = require("./orm");
var CassandraCoreModule = /** @class */ (function () {
    function CassandraCoreModule(options, moduleRef) {
        this.options = options;
        this.moduleRef = moduleRef;
    }
    CassandraCoreModule_1 = CassandraCoreModule;
    CassandraCoreModule.forRoot = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var expressModuleOptions = {
            provide: cassandra_constant_1.CASSANDRA_MODULE_OPTIONS,
            useValue: options,
        };
        var connectionProvider = {
            provide: (0, cassandra_orm_utils_1.getConnectionToken)(options),
            useFactory: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createConnectionFactory(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); },
        };
        return {
            module: CassandraCoreModule_1,
            providers: [expressModuleOptions, connectionProvider],
            exports: [connectionProvider],
        };
    };
    CassandraCoreModule.forRootAsync = function (options) {
        var _this = this;
        var connectionProvider = {
            provide: (0, cassandra_orm_utils_1.getConnectionToken)(options),
            useFactory: function (typeormOptions) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options.name) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.createConnectionFactory(__assign(__assign({}, typeormOptions), { name: options.name }))];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [4 /*yield*/, this.createConnectionFactory(typeormOptions)];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
            inject: [cassandra_constant_1.CASSANDRA_MODULE_OPTIONS],
        };
        var asyncProviders = this.createAsyncProviders(options);
        return {
            module: CassandraCoreModule_1,
            imports: options.imports,
            providers: __spreadArray(__spreadArray([], asyncProviders, true), [
                connectionProvider,
                {
                    provide: cassandra_constant_1.CASSANDRA_MODULE_ID,
                    useValue: (0, cassandra_orm_utils_1.generateString)(),
                },
            ], false),
            exports: [connectionProvider],
        };
    };
    CassandraCoreModule.prototype.onModuleDestroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.options.keepConnectionAlive) {
                            return [2 /*return*/];
                        }
                        common_1.Logger.log('Closing connection', 'CassandraModule');
                        connection = this.moduleRef.get((0, cassandra_orm_utils_1.getConnectionToken)(this.options));
                        // tslint:disable-next-line:no-unused-expression
                        _a = connection;
                        if (!_a) 
                        // tslint:disable-next-line:no-unused-expression
                        return [3 /*break*/, 2];
                        return [4 /*yield*/, connection.closeAsync()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        // tslint:disable-next-line:no-unused-expression
                        _a;
                        return [2 /*return*/];
                }
            });
        });
    };
    CassandraCoreModule.createAsyncProviders = function (options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        var providers = [this.createAsyncOptionsProvider(options)];
        if (options.useClass) {
            providers.push({
                provide: options.useClass,
                useClass: options.useClass,
            });
        }
        return providers;
    };
    CassandraCoreModule.createAsyncOptionsProvider = function (options) {
        var _this = this;
        if (options.useFactory) {
            return {
                provide: cassandra_constant_1.CASSANDRA_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        var inject;
        if (options.useClass || options.useExisting) {
            var inject_1 = [options.useClass || options.useExisting];
        }
        return {
            inject: inject,
            provide: cassandra_constant_1.CASSANDRA_MODULE_OPTIONS,
            useFactory: function (optionsFactory) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, optionsFactory.createCassandraOptions()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); },
        };
    };
    CassandraCoreModule.createConnectionFactory = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var retryAttempts, retryDelay, cassandraOptions, connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retryAttempts = options.retryAttempts, retryDelay = options.retryDelay, cassandraOptions = __rest(options, ["retryAttempts", "retryDelay"]);
                        connection = new orm_1.Connection(cassandraOptions);
                        return [4 /*yield*/, (0, rxjs_1.lastValueFrom)((0, rxjs_1.defer)(function () { return connection.initAsync(); }).pipe((0, cassandra_orm_utils_1.handleRetry)(retryAttempts, retryDelay), (0, operators_1.map)(function () { return connection; })))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var CassandraCoreModule_1;
    CassandraCoreModule = CassandraCoreModule_1 = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({}),
        __param(0, (0, common_1.Inject)(cassandra_constant_1.CASSANDRA_MODULE_OPTIONS)),
        __metadata("design:paramtypes", [Object, core_1.ModuleRef])
    ], CassandraCoreModule);
    return CassandraCoreModule;
}());
exports.CassandraCoreModule = CassandraCoreModule;
//# sourceMappingURL=casandra-core.module.js.map