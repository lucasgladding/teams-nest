import { Injectable } from '@nestjs/common';
import { Team } from './team.entity';
import { BaseService } from '../base.service';

@Injectable()
export class TeamService extends BaseService<Team> {}
