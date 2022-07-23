import { Team } from './team.entity';
import { ITeamService } from './team.service';

export class StubTeamService implements ITeamService {
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
