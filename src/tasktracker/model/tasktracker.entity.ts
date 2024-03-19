import { AuthEntity } from '../../auth/model/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tasktracker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  storyPoints: number;

  @Column()
  status: string;

  @Column()
  comments: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => AuthEntity, (user) => user.tasktracker, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  user: AuthEntity;
}
