import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { Developer } from './developer.entity';
import { ServiceContract } from '../shared/base.service';
import { JsonInterceptor } from '../shared/json.interceptor';

interface CreateDeveloperDTO {
  name: string;
}

@Controller('api/developers')
export class DeveloperController {
  constructor(
    @Inject('services.developers')
    private service: ServiceContract<Developer>,
  ) {}

  @UseInterceptors(JsonInterceptor)
  @Get()
  async list(): Promise<Developer[]> {
    return this.service.list();
  }

  @Post()
  async create(@Body() data: CreateDeveloperDTO) {
    const developer = new Developer();
    developer.name = data.name;
    return this.service.create(developer);
  }
}
