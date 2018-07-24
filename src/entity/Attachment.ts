import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Conversation} from "./Conversation";

@Entity()
export class Attachment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    channelId: string;

    @ManyToOne(type => Conversation, conversation => Conversation)
    conversation: Conversation;

    @Column()
    fileUrl: string;

    @Column({ nullable: true })
    fileType: string;

    @Column({default: false})
    isRemoved: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

}