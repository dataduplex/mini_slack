import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class UserNotifications {

    @PrimaryGeneratedColumn()
    id: number;

    //This would be an enum, like "All messages", "Direct Messages, mentions", "Nothing"
    @Column({ default: "Direct Messages" })
    deskTopNotificationType: string;
    
    // A list of sound types
    @Column({ default: "Ding" })
    deskTopNotificationSound: string;

    @Column({ default: "Ding" })
    mobileNotificationType: string;
    
    @Column({ default: "Ding" })
    mobileNotificationSound: string;

    @Column({ nullable: true })
    emailNotificationsFrequency: string;

    // and more..

}