import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;
}
