"use strict";
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
exports.generateString = exports.getConnectionName = exports.getRepositoryToken = exports.getModelToken = exports.getConnectionToken = exports.handleRetry = void 0;
var operators_1 = require("rxjs/operators");
var common_1 = require("@nestjs/common");
var orm_1 = require("../orm");
function handleRetry(retryAttempts, retryDelay) {
    if (retryAttempts === void 0) { retryAttempts = 6; }
    if (retryDelay === void 0) { retryDelay = 3000; }
    return function (source) {
        return source.pipe((0, operators_1.retryWhen)(function (e) {
            return e.pipe((0, operators_1.scan)(function (errorCount, error) {
                common_1.Logger.error("Unable to connect to the database. Retrying (".concat(errorCount + 1, ")..."), error.stack, 'CassandraModule');
                if (errorCount + 1 >= retryAttempts) {
                    throw error;
                }
                return errorCount + 1;
            }, 0), (0, operators_1.delay)(retryDelay));
        }));
    };
}
exports.handleRetry = handleRetry;
/**
 * This function returns a Connection injection token for given Connection, ConnectionOptions or connection name.
 * @param {(Connection | ConnectionOptions | string)} [connection='default'] This optional parameter is either
 * a Connection or a ConnectionOptions or a string.
 * @returns {(string | Function | Type<Connection>)} The Connection injection token.
 */
function getConnectionToken(connection) {
    if (connection === void 0) { connection = 'default'; }
    return 'default' === connection
        ? orm_1.Connection
        : 'string' === typeof connection
            ? "".concat(connection, "Connection")
            : 'default' === connection.name || !connection.name
                ? orm_1.Connection
                : "".concat(connection.name, "Connection");
}
exports.getConnectionToken = getConnectionToken;
/**
 * This function returns a Cassandra model token for given entity.
 * @param {Function} entity This parameter is an Entity class.
 * @returns {string} The Cassandra model injection token.
 */
function getModelToken(entity) {
    return "".concat(entity.name, "Model");
}
exports.getModelToken = getModelToken;
/**
 * This function returns a Repository injection token for given entity.
 * @param {Function} entity This options is either an Entity class or Repository.
 * @returns {string} The Repository injection token.
 */
function getRepositoryToken(entity) {
    if (entity.prototype instanceof orm_1.Repository) {
        return entity.name;
    }
    return "".concat(entity.name, "Repository");
}
exports.getRepositoryToken = getRepositoryToken;
function getConnectionName(options) {
    return options && options.name ? options.name : 'default';
}
exports.getConnectionName = getConnectionName;
var generateString = function () {
    // tslint:disable-next-line:no-bitwise
    return __spreadArray([], Array(10), true).map(function (i) { return ((Math.random() * 36) | 0).toString(36); }).join;
};
exports.generateString = generateString;
//# sourceMappingURL=cassandra-orm.utils.js.map