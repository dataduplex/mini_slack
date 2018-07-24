import {Entity, PrimaryColumn, Column, ManyToOne} from "typeorm";
import {Channel} from './Channel';
import {User} from './User';

@Entity()
export class ChannelMembership {
    
    @PrimaryColumn()
    channelId: number;
    
    @PrimaryColumn()
    userId: number;

    // set to false by default, becomes active once user accepts the invitation and joins
    @PrimaryColumn({default: false})
    isActive: boolean;

    @PrimaryColumn({default: true})
    pendingInvite: boolean;

    // This is an enum, "All", "Nothing", "Mute mentions", etc
    @Column({default: "Nothing"})
    muteNotificationsDesktop: string;

    // This is an enum, "All", "Nothing", "Mute mentions", etc
    @Column({default: "Nothing"})
    muteNotificationsMobile: string;

}