import source from '../datasource';
import { DeveloperFactory } from '../../src/developers/developer.factory';
import { TeamFactory } from '../../src/teams/team.factory';

async function seed() {
  await source.initialize();
  await source.query('TRUNCATE TABLE assignment');
  await source.query('TRUNCATE TABLE developer');
  await source.query('TRUNCATE TABLE team');

  const factories = {
    developers: new DeveloperFactory(source.manager),
    teams: new TeamFactory(source.manager),
  } as const;

  await factories.developers.createList(10);
  await factories.teams.createList(10);

  await source.destroy();
}

seed();
