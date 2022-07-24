import { DataSource, DataSourceOptions } from 'typeorm';

export const options: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'secret',
  database: 'teams',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
};

const source = new DataSource(options);

export default source;