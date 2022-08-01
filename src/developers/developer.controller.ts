import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { Developer } from './developer.entity';
import { ServiceContract } from '../shared/base.service';

@Controller('developers')
export class DeveloperController {
  constructor(
    @Inject('services.developers')
    private service: ServiceContract<Developer>,
  ) {}

  @Get()
  async list(): Promise<Developer[]> {
    return this.service.list();
  }

  @Post()
  async create(@Body() data: { name }) {
    const developer = new Developer();
    developer.name = data.name;
    return this.service.create(developer);
  }
}
