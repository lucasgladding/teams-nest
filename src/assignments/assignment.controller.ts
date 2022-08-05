import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { Assignment } from './assignment.entity';
import { ServiceContract } from '../shared/base.service';
import { JsonInterceptor } from '../shared/json.interceptor';

interface CreateAssignmentDTO {
  developer_id: string;
  team_id: string;
  starts_on: Date;
}

@Controller('api/assignments')
export class AssignmentController {
  constructor(
    @Inject('services.assignments')
    private service: ServiceContract<Assignment>,
  ) {}

  @UseInterceptors(JsonInterceptor)
  @Get()
  async list(): Promise<Assignment[]> {
    return this.service.list();
  }

  @Post()
  async create(@Body() data: CreateAssignmentDTO) {
    const assignment = new Assignment();
    assignment.developer_id = data.developer_id;
    assignment.team_id = data.team_id;
    assignment.starts_on = data.starts_on;
    return this.service.create(assignment);
  }
}
