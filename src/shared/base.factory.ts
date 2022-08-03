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
          const instance = await this.build();
          await this.manager.save(instance);
          return instance;
        }),
    );
  }

  async build(): Promise<T> {
    const instance = new this.constructable();
    const generated = await this.generate();
    Object.keys(generated).forEach((name) => {
      instance[name] = generated[name]();
    });
    return instance;
  }

  abstract generate(): Promise<BaseFactory.Generate<T>>;
}
