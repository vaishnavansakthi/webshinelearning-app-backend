import { AuthEntity } from '../../auth/model/auth.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class IframeVideos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tags: string;

  @Column()
  category: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => AuthEntity, (user) => user.iframeVideos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  user: AuthEntity;
}
