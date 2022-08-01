import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Developer } from './developer.entity';
import { BaseService } from '../shared/base.service';

@Injectable()
export class DeveloperService extends BaseService<Developer> {
  constructor(
    @InjectRepository(Developer)
    protected repo: Repository<Developer>,
  ) {
    super(repo);
  }
}
