import {Entity, PrimaryColumn, Column, Index, OneToOne} from "typeorm";

//This table stores the ping-pong time stamps between a server node and a client device
//Presence of a record in this table indicates that the client is ONLINE

//Typically chats are handled through sticky sessions, so a single node handles all traffic for 
// a client.
// To send a web socket message to any client, just find the server node that is currently heartbeating
// with that client and forward it to the server.

// Usually this table is cached using memcache, redis, etc

@Entity()
export class HeartBeatLog {

    @PrimaryColumn()
    nodeId: string;
    
    @PrimaryColumn()
    clientDeviceId: string;

    @Index({ unique: true })
    @Column()
    userId: number;

    @Column()
    lastSeenAt: Date;

}