import { ConnectionOptions, Connection } from '../orm';
export declare const InjectConnection: (connection?: Connection | ConnectionOptions | string) => ParameterDecorator;
export declare const InjectModel: (entity: any) => (target: object, key: string | symbol, index?: number | undefined) => void;
export declare const InjectRepository: (entity: any) => (target: object, key: string | symbol, index?: number | undefined) => void;
