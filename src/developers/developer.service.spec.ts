import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Developer } from './developer.entity';
import { DeveloperFactory } from './developer.factory';
import { DeveloperService } from './developer.service';

import { createDataSource } from '../datasource';
import { transaction } from '../helpers/testing';

describe('DeveloperService', () => {
  let source: DataSource;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: createDataSource,
        }),
      ],
    }).compile();

    source = app.get<DataSource>(DataSource);

    const repo = source.manager.getRepository(Developer);
    await repo.clear();
  });

  afterAll(async () => {
    await source.destroy();
  });

  it('can list', async () => {
    await transaction(source, async (manager) => {
      const count = 10;
      const factory = new DeveloperFactory(manager);
      await factory.createList(count);

      const repo = manager.getRepository(Developer);
      const service = new DeveloperService(repo);

      const found = await service.list();
      expect(found).toHaveLength(count);
    });
  });

  it('can create', async () => {
    await transaction(source, async (manager) => {
      const repo = manager.getRepository(Developer);
      const service = new DeveloperService(repo);

      const developer = new Developer();
      developer.name = 'John Smith';
      await service.create(developer);

      const found = await service.find(developer.id);
      expect(found).toEqual(developer);
    });
  });

  it('can update', async () => {
    await transaction(source, async (manager) => {
      const factory = new DeveloperFactory(manager);
      const developer = await factory.create();

      const repo = manager.getRepository(Developer);
      const service = new DeveloperService(repo);

      const update = new Developer();
      update.name = 'Johnathan Smith';
      const updated = await service.update(developer.id, update);

      expect(updated).toEqual(expect.objectContaining(update));
    });
  });

  it('can delete', async () => {
    await transaction(source, async (manager) => {
      const factory = new DeveloperFactory(manager);
      const developer = await factory.create();

      const repo = manager.getRepository(Developer);
      const service = new DeveloperService(repo);

      expect(await service.find(developer.id)).toEqual(developer);

      await service.delete(developer.id);

      expect(await service.find(developer.id)).toEqual(null);
    });
  });
});
