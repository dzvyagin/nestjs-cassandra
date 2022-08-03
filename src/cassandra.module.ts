import { DynamicModule, Module } from '@nestjs/common';
import { CassandraCoreModule } from './casandra-core.module';
import {
  CassandraModuleOptions,
  CassandraModuleAsyncOptions,
} from './interfaces';
import { createCassandraProviders } from './cassandra.providers';
import { ConnectionOptions, Connection } from './orm';

@Module({})
export class CassandraModule {
  static forRoot(options: CassandraModuleOptions): DynamicModule {
    return {
      module: CassandraModule,
      imports: [CassandraCoreModule.forRoot(options)],
    };
  }

  static forFeature(
    entities: any[] = [],
    connection: Connection | ConnectionOptions | string = 'default',
  ): DynamicModule {
    const providers = createCassandraProviders(entities, connection);
    return {
      module: CassandraModule,
      providers,
      exports: providers,
    };
  }

  static forRootAsync(options: CassandraModuleAsyncOptions): DynamicModule {
    return {
      module: CassandraModule,
      imports: [CassandraCoreModule.forRootAsync(options)],
    };
  }
}
