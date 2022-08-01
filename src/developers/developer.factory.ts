import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Developer } from './developer.entity';
import { BaseFactory } from '../shared/base.factory';

export class DeveloperFactory extends BaseFactory<Developer> {
  constructor(manager: EntityManager) {
    super(manager, Developer);
  }

  generate(): BaseFactory.Generate<Developer> {
    return {
      name: () => faker.word.noun(),
    };
  }
}
