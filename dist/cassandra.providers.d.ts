import { ConnectionOptions, Connection } from './orm';
import { Provider } from '@nestjs/common';
export declare function createCassandraProviders(entities?: any[], connection?: Connection | ConnectionOptions | string): Provider<any>[];
