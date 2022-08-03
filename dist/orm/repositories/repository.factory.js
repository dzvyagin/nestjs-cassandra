"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
var repository_1 = require("./repository");
var return_query_builder_1 = require("./builder/return-query.builder");
var RepositoryFactory = /** @class */ (function () {
    function RepositoryFactory() {
    }
    RepositoryFactory.create = function (entity, model, EntityRepository) {
        if (EntityRepository === void 0) { EntityRepository = repository_1.Repository; }
        var repository = new EntityRepository();
        var returnQueryBuilder = new return_query_builder_1.ReturnQueryBuilder(model);
        Object.assign(repository, { target: entity, model: model, returnQueryBuilder: returnQueryBuilder });
        return repository;
    };
    return RepositoryFactory;
}());
exports.RepositoryFactory = RepositoryFactory;
//# sourceMappingURL=repository.factory.js.map