"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CassandraModule = void 0;
var common_1 = require("@nestjs/common");
var casandra_core_module_1 = require("./casandra-core.module");
var cassandra_providers_1 = require("./cassandra.providers");
var CassandraModule = /** @class */ (function () {
    function CassandraModule() {
    }
    CassandraModule_1 = CassandraModule;
    CassandraModule.forRoot = function (options) {
        return {
            module: CassandraModule_1,
            imports: [casandra_core_module_1.CassandraCoreModule.forRoot(options)],
        };
    };
    CassandraModule.forFeature = function (entities, connection) {
        if (entities === void 0) { entities = []; }
        if (connection === void 0) { connection = 'default'; }
        var providers = (0, cassandra_providers_1.createCassandraProviders)(entities, connection);
        return {
            module: CassandraModule_1,
            providers: providers,
            exports: providers,
        };
    };
    CassandraModule.forRootAsync = function (options) {
        return {
            module: CassandraModule_1,
            imports: [casandra_core_module_1.CassandraCoreModule.forRootAsync(options)],
        };
    };
    var CassandraModule_1;
    CassandraModule = CassandraModule_1 = __decorate([
        (0, common_1.Module)({})
    ], CassandraModule);
    return CassandraModule;
}());
exports.CassandraModule = CassandraModule;
//# sourceMappingURL=cassandra.module.js.map