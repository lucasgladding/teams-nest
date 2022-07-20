import { DataSource, EntityManager } from 'typeorm';

export async function transaction(
  dataSource: DataSource,
  contents: (manager: EntityManager) => Promise<void>,
) {
  const runner = dataSource.createQueryRunner();
  await runner.connect();
  await runner.startTransaction();
  await contents(runner.manager);
  await runner.rollbackTransaction();
  await runner.release();
}
