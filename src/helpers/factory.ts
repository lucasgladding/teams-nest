import { EntityManager } from 'typeorm';

export namespace Factory {
  export type Constructable<T> = new () => T;
  export type Generate<T> = {
    [P in keyof T as Exclude<P, 'id'>]: () => T[P];
  };
}

export abstract class Factory<T> {
  constructor(
    protected manager: EntityManager,
    private constructable: Factory.Constructable<T>,
  ) {}

  async create(): Promise<T> {
    const instance = this.build();
    await this.manager.save(instance);
    return instance;
  }

  async createCount(count: number): Promise<T[]> {
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

  abstract generate(): Factory.Generate<T>;
}
