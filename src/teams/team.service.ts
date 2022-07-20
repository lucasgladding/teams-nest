import { Repository } from 'typeorm';
import Team from './Team.entity';

class TeamService {
  constructor(private repo: Repository<Team>) {}

  async create(team: Team): Promise<void> {
    await this.repo.save(team);
  }

  async find(id: string): Promise<Team | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, props: Partial<Team>): Promise<Team> {
    await this.repo.update({ id }, props);
    return this.find(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}

export default TeamService;
