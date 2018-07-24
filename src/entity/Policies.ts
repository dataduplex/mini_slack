import {Entity, PrimaryColumn, Column, Index} from "typeorm";

@Entity()
export class Policies {
    
    /*
        Things like, conversation retention days, billing policies, etc
    */

    @PrimaryColumn()
    name: string;

    @Column()
    value: string;

}