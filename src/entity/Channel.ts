import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";

@Entity()
export class Channel {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    teamId: number;

    @Column({ default: true })
    isPrivate: boolean;

    @Column()
    isOneToOne: boolean;

    @Column()
    creatorId: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;




}