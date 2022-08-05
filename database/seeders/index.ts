import source from '../datasource';
import { AssignmentFactory } from '../../src/assignments/assignment.factory';
import { DeveloperFactory } from '../../src/developers/developer.factory';
import { TeamFactory } from '../../src/teams/team.factory';

async function seed() {
  await source.initialize();
  await source.query('SET FOREIGN_KEY_CHECKS = 0');
  await source.query('TRUNCATE TABLE assignment');
  await source.query('TRUNCATE TABLE developer');
  await source.query('TRUNCATE TABLE team');
  await source.query('SET FOREIGN_KEY_CHECKS = 1');

  await new DeveloperFactory(source.manager).createList(50);
  await new TeamFactory(source.manager).createList(10);
  await new AssignmentFactory(source.manager).createList(50);

  await source.destroy();
}

seed();
