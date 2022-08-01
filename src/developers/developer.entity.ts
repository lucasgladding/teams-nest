import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';

@Entity()
export class Developer extends BaseEntity {
  @Column()
  name: string;
}
