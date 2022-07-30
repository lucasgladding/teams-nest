import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Team } from './team.entity';
import { BaseFactory } from '../shared/base.factory';

export class TeamFactory extends BaseFactory<Team> {
  constructor(manager: EntityManager) {
    super(manager, Team);
  }

  generate(): BaseFactory.Generate<Team> {
    return {
      name: () => faker.word.noun(),
    };
  }
}
