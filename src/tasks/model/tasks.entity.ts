import { AuthEntity } from "../../auth/model/auth.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    githubUrl: string;

    @Column()
    deployedUrl: string;

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => AuthEntity, (user) => user.tasks, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    })
    user: AuthEntity;
}