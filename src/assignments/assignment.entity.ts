import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';

@Entity()
export class Assignment extends BaseEntity {
  @Column()
  developer_id: string;

  @Column()
  team_id: string;

  @Column()
  starts_on: Date;
}
