import { EntityManager } from 'typeorm';

export namespace BaseFactory {
  export type Constructable<T> = new () => T;
  export type Generate<T> = {
    [P in keyof T as Exclude<P, 'id'>]: () => T[P];
  };
}

export abstract class BaseFactory<T> {
  protected constructor(
    protected manager: EntityManager,
    protected constructable: BaseFactory.Constructable<T>,
  ) {}

  async create(): Promise<T> {
    const instance = this.build();
    await this.manager.save(instance);
    return instance;
  }

  async createList(count: number): Promise<T[]> {
    return await Promise.all(
      Array(count)
        .fill(undefined)
        .map(async () => {
          const instance = this.build();
          await this.manager.save(instance);
          return instance;
        }),
    );
  }

  build(): T {
    const instance = new this.constructable();
    const generated = this.generate();
    Object.keys(generated).forEach((name) => {
      instance[name] = generated[name]();
    });
    return instance;
  }

  abstract generate(): BaseFactory.Generate<T>;
}
