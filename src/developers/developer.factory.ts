import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Developer } from './developer.entity';
import { BaseFactory } from '../shared/base.factory';

type Generator = BaseFactory.Generate<Developer>;

export class DeveloperFactory extends BaseFactory<Developer> {
  constructor(manager: EntityManager) {
    super(manager, Developer);
  }

  async generate(): Promise<Generator> {
    return {
      name: () => faker.word.noun(),
    };
  }
}
