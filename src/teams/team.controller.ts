import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { Team } from './team.entity';
import { ServiceContract } from '../shared/base.service';
import { JsonInterceptor } from '../shared/json.interceptor';

interface CreateTeamDTO {
  name: string;
}

@Controller('api/teams')
export class TeamController {
  constructor(
    @Inject('services.teams')
    private service: ServiceContract<Team>,
  ) {}

  @UseInterceptors(JsonInterceptor)
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
