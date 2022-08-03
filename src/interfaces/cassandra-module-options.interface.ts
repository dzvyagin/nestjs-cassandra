import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ConnectionOptions } from '../orm';

export type CassandraModuleOptions = {
  retryAttempts?: number;

  retryDelay?: number;

  keepConnectionAlive?: boolean;
} & Partial<ConnectionOptions>;

export interface CassandraOptionsFactory {
  createCassandraOptions():
    | Promise<CassandraModuleOptions>
    | CassandraModuleOptions;
}

export interface CassandraModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;

  useExisting?: Type<CassandraOptionsFactory>;

  useClass?: Type<CassandraOptionsFactory>;

  useFactory?: (
    ...args: any[]
  ) => Promise<CassandraModuleOptions> | CassandraModuleOptions;

  inject?: any[];
}
