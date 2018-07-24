import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {Channel} from "../entity/Channel";
import { ChannelMembership } from "../entity/ChannelMembership";


export async function createChannel(channel: Channel) {

    let c = await getChannelByName(channel.name);

    if (c) {
        throw new Error(`Channel with name ${channel.name} already exists`);
    }

    // Save the channel
    await getConnection().getRepository(Channel).save(channel);

    // Creator is the first member of the channel
    let channelMembership = new ChannelMembership();
    channelMembership.channelId = channel.id; // ORM populates this for us
    channelMembership.userId = channel.creatorId;
    channelMembership.isActive = true;
    
    await getConnection().getRepository(ChannelMembership).save(channelMembership);
}

// This will be called when someone tries to send message to someone for the first time
export async function createOneToOneChannel(channel: Channel, toUser: User) {
    
    // Save the channel
    await getConnection().getRepository(Channel).save(channel);

    let channelMembership = new ChannelMembership();
    channelMembership.channelId = channel.id; 
    channelMembership.userId = channel.creatorId;
    channelMembership.isActive = true;
    channelMembership.pendingInvite = false;

    await getConnection().getRepository(ChannelMembership).save(channelMembership);

    channelMembership = new ChannelMembership();
    channelMembership.channelId = channel.id; 
    channelMembership.userId = toUser.id;
    channelMembership.isActive = true;
    channelMembership.pendingInvite = false;

    await getConnection().getRepository(ChannelMembership).save(channelMembership);
}



export async function addMemberToPublicChannel(channel: Channel, user: User) {

    let memberShip = await isMember(channel.id,user.id);

    if (memberShip) {
        throw new Error(`${user.id} is already a member of ${channel.name}`);
    }

    let channelMembership = new ChannelMembership();
    channelMembership.channelId = channel.id;
    channelMembership.userId = user.id;
    channelMembership.isActive = true; 
    channelMembership.pendingInvite = false;
    await getConnection().getRepository(ChannelMembership).save(channelMembership);

}


export async function inviteMember(channel: Channel, user: User) {
    let memberShip = await getMemberShip(channel.id, user.id);

    if (memberShip.pendingInvite) {
        throw new Error(`${user.id} has already been invited to ${channel.name}`);
    }

    let channelMembership = new ChannelMembership();
    channelMembership.channelId = channel.id;
    channelMembership.userId = user.id;
    channelMembership.isActive = false; 
    channelMembership.pendingInvite = true;
    await getConnection().getRepository(ChannelMembership).save(channelMembership);

}


export async function acceptInvite(channel: Channel, user: User) {
    
    let memberShip = await getMemberShip(channel.id, user.id);

    if (! memberShip.pendingInvite) {
        throw new Error(`${user.id} has already accepted ${channel.name}`);
    }

    memberShip.isActive = true; 
    memberShip.pendingInvite = false;
    await getConnection().getRepository(ChannelMembership).save(memberShip);

}


export async function isMember(userId: number, channelId: number)  {
    let m = await getConnection().getRepository(ChannelMembership).findOne({ channelId: channelId,
        userId: userId,
        isActive: true
    });

    if (m) {
        return true;
    } else {
        return false;
    }   
}


export async function getChannelByName(name: string) {
    return await getConnection().getRepository(Channel).findOne({name: name});
}


export async function getMemberShip(userId: number, channelId: number)  {
    let m = await getConnection().getRepository(ChannelMembership).findOne({ channelId: channelId,
        userId: userId
    });

    return m;
}


export async function getAllMembers(channel: Channel) {
    
    const members = await getConnection().getRepository(ChannelMembership).find(
        {   select: ["userId"],
            where: { channelId : channel.id, isActive: true } 
        }
    );

    let userArray = [];
    for (const m of members) {
        userArray.push(m.userId);
    }
    return userArray;
}

export async function getAllChannelsByUser(user: User) {

    const channels = await getConnection().getRepository(ChannelMembership).find(
        {   select: ["channelId"],
            where: { userId : user.id, isActive: true } 
        }
    );

    let channelArray = [];
    for (const c of channels) {
        channelArray.push(c.channelId);
    }
    return channelArray;
}

export async function sendChannelInvite(channel: Channel, user: User) {
    // STUB
}

export async function removeMember(channel: Channel, userId: number) {
    // set isActive to false

}

  // To support autocomplete features
  // STUB
  export async function getChannelsByNamePrefix(prefix: string)  {
    
    return [];
  }

