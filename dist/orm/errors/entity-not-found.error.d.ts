export declare class EntityNotFoundError extends Error {
    name: string;
    readonly message: any;
    constructor(entityClass: any | string, query: any);
    private stringifyQuery;
}
