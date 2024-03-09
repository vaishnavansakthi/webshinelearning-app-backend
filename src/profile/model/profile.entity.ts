import { AuthEntity } from 'src/auth/model/auth.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  degree: string;

  @OneToOne(() =>   AuthEntity, (user) => user.profile, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  user: AuthEntity;
}
