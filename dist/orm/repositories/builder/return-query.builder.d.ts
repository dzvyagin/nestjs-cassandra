import { BaseModel, SaveOptionsStatic, FindQuery, DeleteOptionsStatic, UpdateOptionsStatic } from '../../interfaces/externals/cassandra.interface';
export declare class ReturnQueryBuilder<T = any> {
    private readonly model;
    constructor(model: BaseModel<T>);
    save(model: Partial<T>, options?: SaveOptionsStatic): string;
    update(query: FindQuery<T> | undefined, updateValue: Partial<T>, options?: UpdateOptionsStatic<T>): string;
    delete(query?: FindQuery<T>, options?: DeleteOptionsStatic): string;
}
