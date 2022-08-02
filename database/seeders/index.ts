import source from '../datasource/datasource';
import { DeveloperFactory } from '../../src/developers/developer.factory';
import { TeamFactory } from '../../src/teams/team.factory';

async function seed() {
  await source.initialize();
  await source.query('TRUNCATE TABLE assignment');
  await source.query('TRUNCATE TABLE developer');
  await source.query('TRUNCATE TABLE team');

  await new DeveloperFactory(source.manager).createList(10);
  await new TeamFactory(source.manager).createList(10);

  await source.destroy();
}

seed();
