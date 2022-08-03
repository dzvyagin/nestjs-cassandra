import { DynamicModule } from '@nestjs/common';
import { CassandraModuleOptions, CassandraModuleAsyncOptions } from './interfaces';
import { ConnectionOptions, Connection } from './orm';
export declare class CassandraModule {
    static forRoot(options: CassandraModuleOptions): DynamicModule;
    static forFeature(entities?: any[], connection?: Connection | ConnectionOptions | string): DynamicModule;
    static forRootAsync(options: CassandraModuleAsyncOptions): DynamicModule;
}
