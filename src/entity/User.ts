import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, Index, JoinColumn} from "typeorm";
import {UserProfile} from "./UserProfile";
import {UserSettings} from "./UserSettings";
import {UserNotifications} from "./UserNotifications";
import {Team} from "./Team";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    email: string;

    @Column()
    role: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isBot: boolean;

    @Column({ default: false })
    isAdmin: boolean;

    @ManyToOne(type => Team, team => team.users)
    team: Team;

    @Column()
    passwordDigest: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({nullable: true})
    lastLoginAt: Date;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToOne(type => UserProfile)
    @JoinColumn()
    profile: UserProfile;

    @OneToOne(type => UserSettings)
    @JoinColumn()
    settings: UserSettings;

    @OneToOne(type => UserNotifications)
    @JoinColumn()
    notifications: UserNotifications;

}
