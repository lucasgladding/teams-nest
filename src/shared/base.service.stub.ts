import { BaseEntity } from './base.entity';
import { ServiceContract } from './base.service';

export class StubBaseService<T extends BaseEntity>
  implements ServiceContract<T>
{
  list(): Promise<T[]> {
    return Promise.resolve([]);
  }

  create(instance: T): Promise<T> {
    return Promise.resolve(instance);
  }

  find(id: string): Promise<T | null> {
    return Promise.resolve(undefined);
  }

  update(id: string, props: Partial<T>): Promise<T> {
    return Promise.resolve(undefined);
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(null);
  }
}
