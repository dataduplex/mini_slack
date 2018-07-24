import {getConnection} from "typeorm";
import {Conversation} from "../entity/Conversation";
import {Attachment} from "../entity/Attachment";
import {HeartBeatLog} from "../entity/HeartBeatLog";
import {ChannelReadReceipts} from "../entity/ChannelReadReceipts";
import { Channel } from "../entity/Channel";
//import { ChannelMembership } from "../entity/ChannelMembership";
import * as ChannelServices from "./ChannelService";
import { User } from "../entity/User";


// This is for illustration purpose only. 
// Typically User and Channel data are reac from a cache
export async function sendInstantMessage(convo: Conversation, 
    toChannel: Channel, 
    userId?:number,) {

    // first persist the conversation
    let convoRepository = getConnection().getRepository(Conversation);
    let attachmentRepository = getConnection().getRepository(Attachment);
    let heartBeatLogRepository = getConnection().getRepository(HeartBeatLog);
    let receiptsRepository = getConnection().getRepository(ChannelReadReceipts);


    if (convo.hasAttachments) {
        for (const attachment of convo.attachments) {
            await attachmentRepository.save(attachment);
        }
    }
    await convoRepository.save(convo);
    

    // Get all recipients of this convo
    let toUsers = await ChannelServices.getAllMembers(toChannel);

    // Check each one of them is online 
    for (const toUser of toUsers) {

        // Don't send it to yourself
        if (convo.userId === toUser) {
            continue;
        }

        let sent = false;
        let onlineClients = await heartBeatLogRepository.find({ where: { userId : toUser}});
        // If online send it to the node that's heart beating with the client
        if (onlineClients) {
            let sent = false;
            // send message to each connected device - desktop, mobile, etc
            for (const client of onlineClients) {
                // Send message
                const isSuccess = await sendMessageToNode(client.nodeId, client.userId, convo);
                if (isSuccess) {
                    sent = true;
                } 

            }    
        }
        

        // Update the receipt based on sent or not
        let receipt = await receiptsRepository.findOne({channelId: convo.channelId, userId: toUser});
                
        if (! receipt) {
            receipt = new ChannelReadReceipts();  
        } 

        if (sent) {
            receipt.lastReadTs = new Date();
        } else {
            receipt.unreadCount++;
        }
        receipt.channelId = convo.channelId;
        receipt.userId = convo.userId;
        receipt.lastMessageTs = convo.createdAt;
    
        await receiptsRepository.save(receipt);
        
    }

}


// fetch recent conversations for a user
// TODO: Use Join Query to improve performace. Two two database calls can be combined to one.
export async function getConversationHistoryByUser(user: User, limit: number) {
    
    // Get all Channels this person belongs to
    let channels = await ChannelServices.getAllChannelsByUser(user);
    let result = { };
    
    // Get conversation for each channel
    for (const channel of channels) {
        let history = await getConversationHistory(channel, limit);
        result[channel] = history;
    }

    return result;
}

// STUB
export async function getConversationHistory(channel: Channel, limit: number) {
    
    return [];
}


// STUB 
// Websocket communication to message recipient
export async function sendMessageToNode(forwardingServer: string, toUserId: number, convo: Conversation) {

    return true;
}