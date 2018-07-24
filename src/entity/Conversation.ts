import {Entity, PrimaryColumn, Column, OneToMany, OneToOne} from "typeorm";
import {Attachment} from "./Attachment";

@Entity()
export class Conversation {

    @PrimaryColumn()
    id: number;

    @Column()
    channelId: number;

    @Column()
    userId: number;

    @Column({ type: "text", nullable: true })
    text: string;

    // reactions are separated by space
    @Column({nullable: true })
    reactions: string;

    // Possible Enums: MESSAGE
    @Column()
    type: string;

    // Possible Enums: BOT, HUMAN
    @Column({default: "HUMAN"})
    subType: string;

    @Column({default: false})
    hasAttachments: boolean;

    @OneToMany(type => Attachment, attachment => attachment.id)
    attachments: Attachment[];

    @Column({default: false})
    isPinned: boolean;

    // Presence of this indicates this is conversation is part of a thread
    @Column({nullable: true })
    parentId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

}