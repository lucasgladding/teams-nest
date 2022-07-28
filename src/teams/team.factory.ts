import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Team } from './team.entity';
import { Factory } from '../helpers/factory';

export class TeamFactory extends Factory<Team> {
  constructor(manager: EntityManager) {
    super(manager, Team);
  }

  generate(): Factory.Generate<Team> {
    return {
      name: () => faker.word.noun(),
    };
  }
}
