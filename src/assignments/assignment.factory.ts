import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { BaseFactory } from '../shared/base.factory';

import { Assignment } from './assignment.entity';
import { Developer } from '../developers/developer.entity';
import { Team } from '../teams/team.entity';

type Generator = BaseFactory.Generate<Assignment>;

export class AssignmentFactory extends BaseFactory<Assignment> {
  private developers: Developer[] = [];

  private teams: Team[] = [];

  constructor(manager: EntityManager) {
    super(manager, Assignment);
  }

  private async preload(): Promise<void> {
    if (this.developers.length === 0) {
      this.developers = await this.manager.find(Developer);
    }
    if (this.teams.length === 0) {
      this.teams = await this.manager.find(Team);
    }
  }

  async generate(): Promise<Generator> {
    await this.preload();
    const developer = faker.helpers.arrayElement(this.developers);
    const team = faker.helpers.arrayElement(this.teams);
    return {
      developer: () => developer,
      developer_id: () => developer.id,
      team: () => team,
      team_id: () => team.id,
      starts_on: () => faker.date.past(1),
    };
  }
}
