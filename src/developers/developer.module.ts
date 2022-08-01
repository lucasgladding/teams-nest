import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Developer } from './developer.entity';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Developer])],
  controllers: [DeveloperController],
  providers: [{ provide: 'services.developers', useClass: DeveloperService }],
})
export class DeveloperModule {}
