import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';

@Entity()
export class Team extends BaseEntity {
  @Column()
  name: string;
}
