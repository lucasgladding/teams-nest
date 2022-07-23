import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './Team.entity';

export interface ITeamService {
  list(): Promise<Team[]>;
  create(team: Team): Promise<Team>;
  find(id: string): Promise<Team | null>;
  update(id: string, props: Partial<Team>): Promise<Team>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class TeamService implements ITeamService {
  constructor(
    @InjectRepository(Team)
    private repo: Repository<Team>,
  ) {}

  async list(): Promise<Team[]> {
    return this.repo.find();
  }

  async create(team: Team): Promise<Team> {
    return this.repo.save(team);
  }

  async find(id: string): Promise<Team | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, props: Partial<Team>): Promise<Team> {
    return this.repo.save({ id, ...props });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}
