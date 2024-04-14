import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  topic: string;

  @Column({ nullable: true })
  prerequisite: string;

  @Column({ nullable: true })
  sessionTiming: string;

  @Column({ nullable: true })
  meetLink: string;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;
}
