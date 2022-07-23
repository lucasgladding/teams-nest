import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './teams/team.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { options } from './development.data-source';

@Module({
  imports: [TypeOrmModule.forRoot(options), TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
