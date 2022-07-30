import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';

export interface ServiceContract<T> {
  list(): Promise<T[]>;
  create(instance: T): Promise<T>;
  find(id: string): Promise<T | null>;
  update(id: string, props: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

// NOTE: types appear to cause problems with 'find where'
export class BaseService<T extends BaseEntity> implements ServiceContract<T> {
  constructor(protected repo: Repository<T>) {}

  async list(): Promise<T[]> {
    return this.repo.find();
  }

  async create(instance: T): Promise<T> {
    return this.repo.save(instance);
  }

  async find(id: string): Promise<T | null> {
    return this.repo.findOneBy({ id: id as any });
  }

  async update(id: string, props: Partial<T>): Promise<T> {
    const data = { ...props, id } as unknown as T;
    return this.repo.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete({ id: id as any });
  }
}
