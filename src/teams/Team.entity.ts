import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

export default Team;
