import { DynamicModule, OnModuleDestroy } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CassandraModuleOptions, CassandraModuleAsyncOptions } from './interfaces';
export declare class CassandraCoreModule implements OnModuleDestroy {
    private readonly options;
    private readonly moduleRef;
    constructor(options: CassandraModuleOptions, moduleRef: ModuleRef);
    static forRoot(options?: CassandraModuleOptions): DynamicModule;
    static forRootAsync(options: CassandraModuleAsyncOptions): DynamicModule;
    onModuleDestroy(): Promise<void>;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
    private static createConnectionFactory;
}
