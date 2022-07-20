import { Team } from './Team.entity';
import { TeamService } from './team.service';

import developmentDataSource from '../development.data-source';
import { transaction } from '../helpers/testing';

describe('TeamService', () => {
  beforeAll(async () => {
    await developmentDataSource.initialize();
  });

  it('can list', async () => {
    await transaction(developmentDataSource, async (manager) => {
      const repo = manager.getRepository(Team);
      const service = new TeamService(repo);

      const names = ['Team 1', 'Team 2'];
      const teams = await Promise.all(
        names.map((name) => {
          const team = new Team();
          team.name = name;
          return service.create(team);
        }),
      );

      const found = await service.list();
      expect(found).toEqual(teams);
    });
  });

  it('can create', async () => {
    await transaction(developmentDataSource, async (manager) => {
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
    await transaction(developmentDataSource, async (manager) => {
      const repo = manager.getRepository(Team);
      const service = new TeamService(repo);

      const team = new Team();
      team.name = 'Team 1';
      await service.create(team);

      const props = { name: 'Team 2' };
      const updated = await service.update(team.id, props);

      expect(updated).toEqual(expect.objectContaining(props));
    });
  });

  it('can delete', async () => {
    await transaction(developmentDataSource, async (manager) => {
      const repo = manager.getRepository(Team);
      const service = new TeamService(repo);

      const team = new Team();
      team.name = 'Team 1';
      await service.create(team);

      expect(await service.find(team.id)).toEqual(team);

      await service.delete(team.id);

      expect(await service.find(team.id)).toEqual(null);
    });
  });
});
