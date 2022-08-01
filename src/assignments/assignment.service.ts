import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Assignment } from './assignment.entity';
import { BaseService } from '../shared/base.service';

@Injectable()
export class AssignmentService extends BaseService<Assignment> {
  constructor(
    @InjectRepository(Assignment)
    protected repo: Repository<Assignment>,
  ) {
    super(repo);
  }
}
