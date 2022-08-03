import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Team } from './team.entity';
import { BaseFactory } from '../shared/base.factory';

type Generator = BaseFactory.Generate<Team>;

export class TeamFactory extends BaseFactory<Team> {
  constructor(manager: EntityManager) {
    super(manager, Team);
  }

  async generate(): Promise<Generator> {
    return {
      name: () => faker.word.noun(),
    };
  }
}
