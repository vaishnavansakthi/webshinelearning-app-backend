import { AuthEntity } from 'src/auth/model/auth.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  degree: string;

  @Column({ nullable: true })
  university: string;

  @Column({ nullable: true })
  graduationYear: string;

  @Column({ nullable: true })
  fieldOfStudy: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  hobbies: string;

  @Column({ nullable: true })
  dateOfBirth: string;


  @OneToOne(() =>   AuthEntity, (user) => user.profile, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  user: AuthEntity;
}
