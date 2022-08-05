import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';

import { Developer } from '../developers/developer.entity';
import { Team } from '../teams/team.entity';

@Entity()
export class Assignment extends BaseEntity {
  @Column({ precision: 6 })
  starts_on: Date;

  @Column()
  developer_id: string;

  @Column()
  team_id: string;

  @ManyToOne(() => Developer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @ManyToOne(() => Team, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
