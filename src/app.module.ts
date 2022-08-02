import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentModule } from './assignments/assignment.module';
import { DeveloperModule } from './developers/developer.module';
import { TeamModule } from './teams/team.module';

import { getDataSourceConfig } from '../database/datasource/helpers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDataSourceConfig,
    }),
    AssignmentModule,
    DeveloperModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
