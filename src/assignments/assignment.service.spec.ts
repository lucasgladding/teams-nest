import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Assignment } from './assignment.entity';
import { AssignmentFactory } from './assignment.factory';
import { AssignmentService } from './assignment.service';
import { Developer } from '../developers/developer.entity';
import { DeveloperFactory } from '../developers/developer.factory';
import { Team } from '../teams/team.entity';
import { TeamFactory } from '../teams/team.factory';

import { getDataSourceConfig } from '../../database/datasource/helpers';
import { flush, transaction } from '../helpers/testing';

describe('AssignmentService', () => {
  let source: DataSource;
  let developer: Developer;
  let team: Team;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getDataSourceConfig,
        }),
      ],
    }).compile();

    source = app.get<DataSource>(DataSource);
    await flush(source);

    const manager = source.manager;
    developer = await new DeveloperFactory(manager).create();
    team = await new TeamFactory(manager).create();
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

      const subject = new Assignment();
      subject.developer_id = developer.id;
      subject.team_id = team.id;
      subject.starts_on = new Date();
      await service.create(subject);

      const response = await service.find(subject.id);
      expect(response).toEqual(subject);
    });
  });

  it('can update', async () => {
    await transaction(source, async (manager) => {
      const factory = new AssignmentFactory(manager);
      const assignment = await factory.create();

      const repo = manager.getRepository(Assignment);
      const service = new AssignmentService(repo);

      const subject = new Assignment();
      subject.developer = developer;
      subject.team = team;
      subject.starts_on = new Date();
      const response = await service.update(assignment.id, subject);

      expect(response).toEqual(subject);
    });
  });

  it('can delete', async () => {
    await transaction(source, async (manager) => {
      const factory = new AssignmentFactory(manager);
      const assignment = await factory.create();

      const repo = manager.getRepository(Assignment);
      const service = new AssignmentService(repo);

      expect(await service.find(assignment.id)).not.toEqual(null);

      await service.delete(assignment.id);

      expect(await service.find(assignment.id)).toEqual(null);
    });
  });
});
