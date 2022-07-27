import { FindOptionsWhereProperty, Repository } from 'typeorm';

interface Record {
  id: string;
}

export interface Service<T> {
  list(): Promise<T[]>;
  create(instance: T): Promise<T>;
  find(id: string): Promise<T | null>;
  update(id: string, props: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export class BaseService<T extends Record> implements Service<T> {
  constructor(private repo: Repository<T>) {}

  async list(): Promise<T[]> {
    return this.repo.find();
  }

  async create(instance: T): Promise<T> {
    return this.repo.save(instance);
  }

  async find(id: string): Promise<T | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, props: Partial<T>): Promise<T> {
    return this.repo.save({ id, ...props });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}
