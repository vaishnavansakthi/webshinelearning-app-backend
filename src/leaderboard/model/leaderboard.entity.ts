import { AuthEntity } from '../../auth/model/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  suggestion: string;

  @Column()
  points: number;

  @ManyToOne(() => AuthEntity, (user) => user.leaderboard, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  user: AuthEntity;

  @CreateDateColumn()
  createdAt: Date;
}
