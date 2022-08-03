import {
  DynamicModule,
  Module,
  Global,
  Provider,
  OnModuleDestroy,
  Inject,
  Logger,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  CassandraModuleOptions,
  CassandraModuleAsyncOptions,
  CassandraOptionsFactory,
} from './interfaces';
import {
  CASSANDRA_MODULE_OPTIONS,
  CASSANDRA_MODULE_ID,
} from './cassandra.constant';
import {
  getConnectionToken,
  handleRetry,
  generateString,
} from './utils/cassandra-orm.utils';
import { defer, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionOptions, Connection } from './orm';

@Global()
@Module({})
export class CassandraCoreModule implements OnModuleDestroy {
  constructor(
    @Inject(CASSANDRA_MODULE_OPTIONS)
    private readonly options: CassandraModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  static forRoot(options: CassandraModuleOptions = {}): DynamicModule {
    const expressModuleOptions = {
      provide: CASSANDRA_MODULE_OPTIONS,
      useValue: options,
    };
    const connectionProvider = {
      provide: getConnectionToken(options as ConnectionOptions),
      useFactory: async () => await this.createConnectionFactory(options),
    };
    return {
      module: CassandraCoreModule,
      providers: [expressModuleOptions, connectionProvider],
      exports: [connectionProvider],
    };
  }

  static forRootAsync(options: CassandraModuleAsyncOptions): DynamicModule {
    const connectionProvider = {
      provide: getConnectionToken(options as ConnectionOptions),
      useFactory: async (typeormOptions: CassandraModuleOptions) => {
        if (options.name) {
          return await this.createConnectionFactory({
            ...typeormOptions,
            name: options.name,
          });
        }
        return await this.createConnectionFactory(typeormOptions);
      },
      inject: [CASSANDRA_MODULE_OPTIONS],
    };

    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: CassandraCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        connectionProvider,
        {
          provide: CASSANDRA_MODULE_ID,
          useValue: generateString(),
        },
      ],
      exports: [connectionProvider],
    };
  }

  async onModuleDestroy() {
    if (this.options.keepConnectionAlive) {
      return;
    }
    Logger.log('Closing connection', 'CassandraModule');
    const connection = this.moduleRef.get<Connection>(
      getConnectionToken(this.options as ConnectionOptions) as any,
    );
    // tslint:disable-next-line:no-unused-expression
    connection && (await connection.closeAsync());
  }

  private static createAsyncProviders(
    options: CassandraModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const providers = [this.createAsyncOptionsProvider(options)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: CassandraModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: CASSANDRA_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    let inject;
    if (options.useClass || options.useExisting) {
      const inject = [options.useClass || options.useExisting];
    }

    return {
      inject,
      provide: CASSANDRA_MODULE_OPTIONS,
      useFactory: async (optionsFactory: CassandraOptionsFactory) =>
        await optionsFactory.createCassandraOptions(),
    };
  }

  private static async createConnectionFactory(
    options: CassandraModuleOptions,
  ): Promise<Connection> {
    const { retryAttempts, retryDelay, ...cassandraOptions } = options;
    const connection = new Connection(cassandraOptions);

    return await lastValueFrom(
      defer(() => connection.initAsync()).pipe(
        handleRetry(retryAttempts, retryDelay),
        map(() => connection),
      ),
    );
  }
}
