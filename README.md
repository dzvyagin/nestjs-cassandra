Express Cassandra utilities module for [NestJS](https://github.com/nestjs/nest) based on the [cassandra](https://github.com/masumsoft/cassandra) package.

## Installation

```bash
$ npm i --save nestjs-cassandra
```

## Example

In app.module.ts:

```typescript
imports: [
  CassandraModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) =>
      configService.get('database'),
    inject: [ConfigService],
  }),
  CassandraModule.forFeature([ExampleEntity]),
],
```

Сonfig is required, now if it is not, there will be an error. This will be fixed in the next version.

In example.module.ts:

```typescript
imports: [CassandraModule.forFeature([ExampleEntity])],
```

In example.service.ts:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel, BaseModel } from 'nestjs-cassandra';
import { ExampleEntity } from './example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectModel(ExampleEntity)
    private readonly exampleEntity: BaseModel<ExampleEntity>,
  ) {}

  getByName(name: string): Promise<ExampleEntity> {
    return this.exampleEntity.findOneAsync({ name: name }, { raw: true });
  }
}
```

In example.entity.ts:

```typescript
import { Entity, Column, GeneratedUUidColumn } from 'nestjs-cassandra';

@Entity({
  table_name: 'example',
  key: ['id'],
})
export class PhotoEntity {
  @GeneratedUUidColumn()
  id: any;

  @GeneratedUUidColumn('timeuuid')
  time_id: any;

  @Column({
    type: 'text',
  })
  name: string;
}
```

UUID is a special type of columns of the cassandra, to bring the string to this type, you need to import the function uuid and pass the string into it

```typescript
import { uuid } from 'nestjs-cassandra';

const cassandraUUid = uuid('37e27292-0d9f-43a5-9d34-fa7c763aca10');
this.entity.find({ id: cassandraUUid });
```

Initially many methods give Observable, to lead to Promise use [lastValueFrom](https://rxjs.dev/api/index/function/lastValueFrom) or [toPromise](https://www.learnrxjs.io/learn-rxjs/operators/utility/topromise).

Soon a flag will be added that will allow you to select the type of result (Promise or Observable).

## Usage

Import `CassandraModule`:

```typescript
@Module({
  imports: [
    CassandraModule.forRoot({...})
  ],
  providers: [...]
})
export class AppModule {}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use registerAsync() method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
CassandraModule.forRootAsync({
  useFactory: () => ({...}),
})
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
CassandraModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => configService.getDbConfig(),
  inject: [ConfigService],
});
```

**2. Use class**

```typescript
CassandraModule.forRootAsync({
  useClass: ConfigService,
});
```

Above construction will instantiate `ConfigService` inside `CassandraModule` and will leverage it to create options object.

```typescript
class ConfigService implements CassandraOptionsFactory {
  createCassandraOptions(): CassandraModuleOptions {
    return {...};
  }
}
```

**3. Use existing**

```typescript
CassandraModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
});
```

It works the same as `useClass` with one critical difference - `CassandraModule` will lookup imported modules to reuse already created ConfigService, instead of instantiating it on its own.

## ORM Options

```typescript
import { Entity, Column } from 'nestjs-cassandra';

@Entity({
  table: 'photo',
  key: ['id'],
})
export class PhotoEntity {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  id: any;

  @Column({
    type: 'text',
  })
  name: string;
}
```

Let's have a look at the `PhotoModule`

```typescript
import { Module } from '@nestjs/common';
import { CassandraModule } from 'nestjs-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [CassandraModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

This module uses `forFeature()` method to define which entities shall be registered in the current scope. Thanks to that we can inject the `PhotoEntity` to the `PhotoService` using the `@InjectModel()` decorator:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel, BaseModel } from 'nestjs-cassandra';
import { PhotoEntity } from './photo.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(PhotoEntity)
    private readonly photoEntity: BaseModel<PhotoEntity>,
  ) {}

  getByName(name: string): Promise<PhotoEntity> {
    return this.photoEntity.findOneAsync({ name: name }, { raw: true });
  }
}
```

**Using Column Decorators:**
To auto-generate uuid/timeuuid column, you need to decorate an entity's properties you want to make into a auto-generated
uuid/timeuuid column with a `@GeneratedUUidColumn` decorator.

```typescript
import { Entity, Column, GeneratedUUidColumn } from 'nestjs-cassandra';

@Entity({
  table: 'photo',
  key: ['id'],
})
export class PhotoEntity {
  @GeneratedUUidColumn()
  id: any;

  @GeneratedUUidColumn('timeuuid')
  time_id: any;

  @Column({
    type: 'text',
  })
  name: string;
}
```

To auto-generate createdDate/updatedDate column, you need to decorate an entity's properties you want to make into a auto-generated
createdDate/updatedDate column with a `@CreateDateColumn` or `@UpdateDateColumn` decorator.

To index a column, you need to decorate an entity's properties you want to index with a `@IndexColumn` decorator.

To auto-generate version column, you need to decorate an entity's properties you want to make into a auto-generated
version column with a `@VersionColumn` decorator.

```typescript
import {
  Entity,
  Column,
  GeneratedUUidColumn,
  CreateDateColumn,
  UpdateDateColumn,
  IndexColumn,
  VersionColumn,
} from 'nestjs-cassandra';

@Entity({
  table: 'photo',
  key: ['id'],
})
export class PhotoEntity {
  @GeneratedUUidColumn()
  id: any;

  @GeneratedUUidColumn('timeuuid')
  time_id: any;

  @Column({
    type: 'text',
  })
  @IndexColumn()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @VersionColumn()
  __v1: any;
}
```

**Using Hook Function Decorators:**
An entity of cassandra support multiple hook function. For more details [see](https://cassandra.readthedocs.io/en/stable/management/#hook-functions).

To create hook function in an entity use `@BeforeSave`, `@AfterSave`, `@BeforeUpdate`, `@AfterUpdate`, `@BeforeDelete`, `@AfterDelete` decorators.

```typescript
import {
  Entity,
  Column,
  GeneratedUUidColumn,
  BeforeSave,
  AfterSave,
  BeforeUpdate,
  AfterUpdate,
  BeforeDelete,
  AfterDelete,
} from 'nestjs-cassandra';

@Entity({
  table: 'photo',
  key: ['id'],
})
export class PhotoEntity {
  @GeneratedUUidColumn()
  id: any;

  @GeneratedUUidColumn('timeuuid')
  time_id: any;

  @BeforeSave()
  beforeSave(instance: this, options: any) {}

  @AfterSave()
  afterSave(instance: this, options: any) {}

  @BeforeUpdate()
  beforeUpdate(query: any, updateValues: any, options: any) {}

  @AfterUpdate()
  afterUpdate(query: any, updateValues: any, options: any) {}

  @BeforeDelete()
  beforeDelete(query: any, options: any) {}

  @AfterDelete()
  afterDelete(query: any, options: any) {}
}
```

## Using Repository

```typescript
import { Module } from '@nestjs/common';
import { CassandraModule } from 'nestjs-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [CassandraModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from 'nestjs-cassandra';
import { PhotoEntity } from './photo.entity';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  getById(id: id): Observable<PhotoEntity> {
    return this.photoRepository.findOne({ id });
  }
}
```

## Using Custom Repository

Let's create a repository:

```typescript
import { Repository, EntityRepository } from 'nestjs-cassandra';
import { PhotoEntity } from './photo.entity';
import { Observable } from 'rxjs';

@EntityRepository(PhotoEntity)
export class PhotoRepository extends Repository<PhotoEntity> {
  findById(id: any): Observable<PhotoEntity> {
    return this.findOne({ id: id });
  }
}
```

Let's have a look at the `PhotoModule`:

```typescript
import { Module } from '@nestjs/common';
import { CassandraModule } from 'nestjs-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';
import { PhotoRepository } from './photo.repository';

@Module({
  imports: [CassandraModule.forFeature([PhotoEntity, PhotoRepository])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

Now let's use `PhotoRepository` in `PhotoService`:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'nestjs-cassandra';
import { PhotoEntity } from './photo.entity';
import { PhotoRepository } from './photo.repository';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository,
  ) {}

  getById(id: any): Observable<PhotoEntity> {
    return this.photoRepository.findById(id);
  }
}
```

Injecting connection:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from 'nestjs-cassandra';
import { PhotoEntity } from './photo.entity';
import { PhotoRepository } from './photo.repository';
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository,
  ) {}

  getById(id: any): Observable<PhotoEntity> {
    return this.photoRepository.findById(id);
  }
}
```

## Using Elassandra

Express cassandra support `Elassandra`. For more details [see](https://cassandra.readthedocs.io/en/stable/elassandra/).

```typescript
@Module({
  imports: [
    CassandraModule.forRoot({
      clientOptions: {
        // omitted other options for clarity
      },
      ormOptions: {
        // omitted other options for clarity
        migration: 'alter',
        manageESIndex: true,
      }
    })
  ],
  providers: [...]
})
export class AppModule {}
```

```typescript
import { Entity, Column } from 'nestjs-cassandra';

@Entity<PhotoEntity>({
  table: 'photo',
  key: ['id'],
  es_index_mapping: {
    discover: '.*',
    properties: {
      name: {
        type: 'string',
        index: 'analyzed',
      },
    },
  },
})
export class PhotoEntity {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  id: any;

  @Column({
    type: 'text',
  })
  name: string;
}
```

```typescript
import { Module } from '@nestjs/common';
import { CassandraModule } from 'nestjs-cassandra';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoEntity } from './photo.entity';

@Module({
  imports: [CassandraModule.forFeature([PhotoEntity])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel, BaseModel } from 'nestjs-cassandra';
import { PhotoEntity } from './photo.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(PhotoEntity)
    private readonly photoEntity: BaseModel<PhotoEntity>,
  ) {}

  searchName(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.catModel.search({ q: `name:${name}` }, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return response(response);
        }
      });
    });
  }
}
```

## Thanks

- Author - [Danila Zvyagin](https://github.com/dzvyagin)
