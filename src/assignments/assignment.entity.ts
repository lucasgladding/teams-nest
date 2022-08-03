import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';

import { Developer } from '../developers/developer.entity';
import { Team } from '../teams/team.entity';

@Entity()
export class Assignment extends BaseEntity {
  @Column()
  starts_on: Date;

  @ManyToOne(() => Developer)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
