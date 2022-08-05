import { DataSource, EntityManager } from 'typeorm';

export async function transaction(
  source: DataSource,
  contents: (manager: EntityManager) => Promise<void>,
) {
  const runner = source.createQueryRunner();
  await runner.connect();
  await runner.startTransaction();
  await contents(runner.manager);
  await runner.rollbackTransaction();
  await runner.release();
}

export async function flush(source: DataSource) {
  await source.query('SET FOREIGN_KEY_CHECKS = 0');
  await source.query('TRUNCATE TABLE assignment');
  await source.query('TRUNCATE TABLE developer');
  await source.query('TRUNCATE TABLE team');
  await source.query('SET FOREIGN_KEY_CHECKS = 1');
}
