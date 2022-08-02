import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

export function getDataSourceOptions(config: ConfigService): DataSourceOptions {
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

const contents = dotenv.config();

const config = new ConfigService(contents);

export const options = getDataSourceOptions(config);

export default new DataSource(options);
