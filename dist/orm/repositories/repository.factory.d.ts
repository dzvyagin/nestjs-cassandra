import { Repository } from './repository';
import { BaseModel } from '../interfaces/externals/cassandra.interface';
export declare class RepositoryFactory {
    static create<T>(entity: any, model: BaseModel, EntityRepository?: typeof Repository): Repository<T>;
}
