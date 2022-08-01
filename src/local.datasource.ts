import { DataSource, DataSourceOptions } from 'typeorm';

// provides the data source for the included docker configuration
// required for typeorm CLI
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

export default new DataSource(options);
