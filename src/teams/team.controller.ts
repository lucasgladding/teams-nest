import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { Team } from './team.entity';
import { ServiceContract } from '../shared/base.service';

interface CreateTeamDTO {
  name: string;
}

@Controller('teams')
export class TeamController {
  constructor(
    @Inject('services.teams')
    private service: ServiceContract<Team>,
  ) {}

  @Get()
  async list(): Promise<Team[]> {
    return this.service.list();
  }

  @Post()
  async create(@Body() data: CreateTeamDTO) {
    const team = new Team();
    team.name = data.name;
    return this.service.create(team);
  }
}
