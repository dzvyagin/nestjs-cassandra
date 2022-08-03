"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectRepository = exports.InjectModel = exports.InjectConnection = void 0;
var common_1 = require("@nestjs/common");
var cassandra_orm_utils_1 = require("./cassandra-orm.utils");
var InjectConnection = function (connection) { return (0, common_1.Inject)((0, cassandra_orm_utils_1.getConnectionToken)(connection)); };
exports.InjectConnection = InjectConnection;
var InjectModel = function (entity) { return (0, common_1.Inject)((0, cassandra_orm_utils_1.getModelToken)(entity)); };
exports.InjectModel = InjectModel;
var InjectRepository = function (entity) {
    return (0, common_1.Inject)((0, cassandra_orm_utils_1.getRepositoryToken)(entity));
};
exports.InjectRepository = InjectRepository;
//# sourceMappingURL=cassandra.decorator.js.map