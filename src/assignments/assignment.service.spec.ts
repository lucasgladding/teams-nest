import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Assignment } from './assignment.entity';
import { AssignmentFactory } from './assignment.factory';
import { AssignmentService } from './assignment.service';

import { createDataSource } from '../datasource';
import { transaction } from '../helpers/testing';

describe('AssignmentService', () => {
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

    const repo = source.manager.getRepository(Assignment);
    await repo.clear();
  });

  afterAll(async () => {
    await source.destroy();
  });

  it('can list', async () => {
    await transaction(source, async (manager) => {
      const count = 10;
      const factory = new AssignmentFactory(manager);
      await factory.createList(count);

      const repo = manager.getRepository(Assignment);
      const service = new AssignmentService(repo);

      const found = await service.list();
      expect(found).toHaveLength(count);
    });
  });

  it('can create', async () => {
    await transaction(source, async (manager) => {
      const repo = manager.getRepository(Assignment);
      const service = new AssignmentService(repo);

      const assignment = new Assignment();
      assignment.developer_id = '1234';
      assignment.team_id = '5678';
      assignment.starts_on = new Date();
      await service.create(assignment);

      const found = await service.find(assignment.id);
      expect(found).toEqual(assignment);
    });
  });

  it('can update', async () => {
    await transaction(source, async (manager) => {
      const factory = new AssignmentFactory(manager);
      const assignment = await factory.create();

      const repo = manager.getRepository(Assignment);
      const service = new AssignmentService(repo);

      const update = new Assignment();
      update.developer_id = '5678';
      update.team_id = '1234';
      update.starts_on = new Date();
      const updated = await service.update(assignment.id, update);

      expect(updated).toEqual(expect.objectContaining(update));
    });
  });

  it('can delete', async () => {
    await transaction(source, async (manager) => {
      const factory = new AssignmentFactory(manager);
      const assignment = await factory.create();

      const repo = manager.getRepository(Assignment);
      const service = new AssignmentService(repo);

      expect(await service.find(assignment.id)).toEqual(assignment);

      await service.delete(assignment.id);

      expect(await service.find(assignment.id)).toEqual(null);
    });
  });
});
