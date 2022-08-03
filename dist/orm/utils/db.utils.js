"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeuuid = exports.isTimeUuid = exports.uuid = exports.isUuid = void 0;
var cassandra_driver_1 = require("cassandra-driver");
var isUuid = function (id) { return id && id instanceof cassandra_driver_1.types.Uuid; };
exports.isUuid = isUuid;
var uuid = function (id) {
    if (!id) {
        return cassandra_driver_1.types.Uuid.random();
    }
    if (typeof id === 'string') {
        return cassandra_driver_1.types.Uuid.fromString(id);
    }
    return id;
};
exports.uuid = uuid;
var isTimeUuid = function (id) {
    return id && id instanceof cassandra_driver_1.types.TimeUuid;
};
exports.isTimeUuid = isTimeUuid;
var timeuuid = function (idOrDate) {
    if (!idOrDate) {
        return cassandra_driver_1.types.TimeUuid.now();
    }
    if (typeof idOrDate === 'string') {
        return cassandra_driver_1.types.TimeUuid.fromString(idOrDate);
    }
    if (idOrDate instanceof Date) {
        return cassandra_driver_1.types.TimeUuid.fromDate(idOrDate);
    }
    return idOrDate;
};
exports.timeuuid = timeuuid;
//# sourceMappingURL=db.utils.js.map