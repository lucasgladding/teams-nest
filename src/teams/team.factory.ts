import { faker } from '@faker-js/faker';
import { Factory } from '../helpers/factory';
import { Team } from './team.entity';
import { EntityManager } from 'typeorm';

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
