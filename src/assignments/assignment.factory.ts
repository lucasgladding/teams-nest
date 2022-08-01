import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Assignment } from './assignment.entity';
import { BaseFactory } from '../shared/base.factory';

export class AssignmentFactory extends BaseFactory<Assignment> {
  constructor(manager: EntityManager) {
    super(manager, Assignment);
  }

  generate(): BaseFactory.Generate<Assignment> {
    return {
      developer_id: () => faker.random.numeric(),
      team_id: () => faker.random.numeric(),
      starts_on: () => faker.date.future(),
    };
  }
}
