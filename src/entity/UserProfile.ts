import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class UserProfile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ nullable: true })
    phoneNo: string;

    @Column({ default: "America/New_York" })
    timeZone: string;

    @Column({ nullable: true })
    jobDescription: string;

    // And some more..

}