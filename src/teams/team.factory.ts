import { faker } from '@faker-js/faker';
import { Factory } from '../helpers/factory';
import { Team } from './team.entity';

export class TeamFactory extends Factory<Team> {
  generate(): Factory.Generate<Team> {
    return {
      name: () => faker.word.noun(),
    };
  }
}
