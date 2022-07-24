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
