import {Entity, PrimaryGeneratedColumn, Column, Index, OneToMany} from "typeorm";
import {User} from "./User";

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    workSpace: string;

    //Team must be created before creating admin user
    @Column({ nullable: true })
    adminId: string;
    
    // Subscription, billing purposes
    @Column()
    subscriptionId: string; 

    // Subscription, billing purposes
    @Column()
    subscriptionType: string; 

    @Column()
    subscriptionStatus: string; 

    @OneToMany(type => User, user => user.team)
    users: User[];

}