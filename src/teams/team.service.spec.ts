import { Team } from './Team.entity';
import { TeamFactory } from './team.factory';
import { TeamService } from './team.service';

import { transaction } from '../helpers/testing';

import source from '../local.data-source';

describe('TeamService', () => {
  beforeAll(async () => {
    await source.initialize();
  });

  afterAll(async () => {
    await source.destroy();
  });

  it('can list', async () => {
    await transaction(source, async (manager) => {
      const count = 10;
      const factory = new TeamFactory(manager, Team);
      await factory.createCount(count);

      const repo = manager.getRepository(Team);
      const service = new TeamService(repo);

      const found = await service.list();
      expect(found).toHaveLength(count);
    });
  });

  it('can create', async () => {
    await transaction(source, async (manager) => {
      const repo = manager.getRepository(Team);
      const service = new TeamService(repo);

      const team = new Team();
      team.name = 'Team 1';
      await service.create(team);

      const found = await service.find(team.id);
      expect(found).toEqual(team);
    });
  });

  it('can update', async () => {
    await transaction(source, async (manager) => {
      const factory = new TeamFactory(manager, Team);
      const team = await factory.create();

      const repo = manager.getRepository(Team);
      const service = new TeamService(repo);

      const props = { name: 'Team 2' };
      const updated = await service.update(team.id, props);

      expect(updated).toEqual(expect.objectContaining(props));
    });
  });

  it('can delete', async () => {
    await transaction(source, async (manager) => {
      const factory = new TeamFactory(manager, Team);
      const team = await factory.create();

      const repo = manager.getRepository(Team);
      const service = new TeamService(repo);

      expect(await service.find(team.id)).toEqual(team);

      await service.delete(team.id);

      expect(await service.find(team.id)).toEqual(null);
    });
  });
});
