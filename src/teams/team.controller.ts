import { Controller, Get } from '@nestjs/common';
import { Team } from './team.entity';
import { ITeamService } from './team.service';

@Controller()
export class TeamController {
  constructor(private service: ITeamService) {}

  @Get()
  async list(): Promise<Team[]> {
    return this.service.list();
  }
}
