import {Entity, PrimaryColumn, Column, OneToMany, OneToOne} from "typeorm";
import {Attachment} from "./Attachment";

// A log of last read timestamp for every channel for every user in that channel.
// This will drive all the logic for marking and saving unreads
@Entity()
export class ChannelReadReceipts {

    @PrimaryColumn()
    channelId: number;

    @PrimaryColumn()
    userId: number;

    @Column()
    lastReadTs: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    lastMessageTs: Date;

    @Column({default: 0})
    unreadCount: number;

}