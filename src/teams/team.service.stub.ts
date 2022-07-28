import { Team } from './team.entity';
import { ServiceContract } from '../base.service';

export class StubTeamService implements ServiceContract<Team> {
  list(): Promise<Team[]> {
    return Promise.resolve([]);
  }

  create(team: Team): Promise<Team> {
    return Promise.resolve(team);
  }

  find(id: string): Promise<Team | null> {
    return Promise.resolve(undefined);
  }

  update(id: string, props: Partial<Team>): Promise<Team> {
    return Promise.resolve(undefined);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(null);
  }
}
