import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export function getDataSourceConfig(config: ConfigService): DataSourceOptions {
  return {
    type: 'mysql',
    host: config.get('DB_HOST'),
    port: +config.get('DB_PORT'),
    username: config.get('DB_USERNAME'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_DATABASE'),
    entities: ['src/**/*.entity.ts'],
    migrations: ['migrations/*.ts'],
  };
}
