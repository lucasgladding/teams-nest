import { Controller, Get, Inject } from '@nestjs/common';
import { Team } from './team.entity';
import { ServiceContract } from '../base.service';

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
}
