import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class UserSettings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    statusEmjoi: string;

    @Column({ default: false })
    invisible: boolean;

    @Column({ nullable: true })
    dndStartHour: number;

    @Column({ nullable: true })
    dndEndHour: number;

    // And more..

}