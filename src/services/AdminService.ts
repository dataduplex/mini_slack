import {getConnection} from "typeorm";
import {Team} from "../entity/Team";
import {User} from "../entity/User";
import * as UserService from "./UserService";
import * as TeamService from "./TeamService";
import {UserSettings} from "../entity/UserSettings";
import {UserProfile} from "../entity/UserProfile";
import {UserNotifications} from "../entity/UserNotifications";


export async function createTeam(team: Team) {
    let teamRepository = getConnection().getRepository(Team);
    
    let teamExist = await TeamService.checkTeamExistsByName(team.name);
    if (teamExist) {
        throw new Error(`Team with name ${team.name} already exists`);
    }
    await teamRepository.save(team);
    console.log("Team has been saved: ", team);
    
}


export async function createUser(user: User, teamName: string, notifications?: UserNotifications, settings?: UserSettings,
profile?: UserProfile) {
    let connection = getConnection();
    

    let userExist = await UserService.getUserByEmail(user.email);
    if (userExist) {
        throw new Error(`User with email ${user.email} already exists`);
    }

    let team = await TeamService.getTeamByName(teamName)
    if (!team) {
        throw new Error(`Team ${teamName} does not exist`);   
    }

    user.team = team;
        
    if (!notifications) {
        notifications = new UserNotifications();
    }

    if (!settings) {
        settings = new UserSettings();
    }

    if (!profile) {
        profile = new UserProfile();
    }

    await connection.getRepository(UserNotifications).save(notifications);
    await connection.getRepository(UserSettings).save(settings);
    await connection.getRepository(UserProfile).save(profile);

    user.notifications=notifications;
    user.settings=settings;
    user.profile=profile;

    await connection.getRepository(User).save(user);

    return user;
        
}


export async function setAdmin(id: number)  {
    
    let userRepository = getConnection().getRepository(User);
    let user = await userRepository.findOne({ where: { id : id }});
    if (!user) {
            throw new Error(`User ID ${id} does not exist`);
    }
    user.isAdmin = true;
    await userRepository.save(user);

}


export async function inviteUserToTeam(teamId: number, userId: number) {
    
} 



