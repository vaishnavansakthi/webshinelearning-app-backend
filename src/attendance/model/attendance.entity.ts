import { AuthEntity } from '../../auth/model/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column()
  desc: string;

  @Column({nullable: true})
  date: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => AuthEntity, (user) => user.attendance, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  user: AuthEntity;
}