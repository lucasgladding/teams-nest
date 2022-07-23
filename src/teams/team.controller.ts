import { Controller, Get, Inject } from '@nestjs/common';
import { Team } from './team.entity';
import { ITeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(
    @Inject('services.teams')
    private service: ITeamService,
  ) {}

  @Get()
  async list(): Promise<Team[]> {
    return this.service.list();
  }
}
