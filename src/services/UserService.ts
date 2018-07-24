import {getConnection} from "typeorm";
import {User} from "../entity/User";
import { UserSettings } from "../entity/UserSettings";

  export async function getFullUserProfileByEmail(email: string)  {
    let result = await getConnection().getRepository(User).findOne({ 
        relations: ["profile", "settings", "notifications"],  
        where: { email : email , isActive: true}});
    return result;
  }

  export async function getFullUserProfileById(id: number)  {
    let result = await getConnection().getRepository(User).findOne({ 
        relations: ["profile", "settings", "notifications"],  
        where: { id : id, isActive: true }});
    return result;
  }

  export async function updateUserSettings(settings: UserSettings)  {
    let repository = getConnection().getRepository(UserSettings);
    //let userSettings = await repository.findOne({id: settings.id});
    return await repository.save(settings);
    
  }


  export async function getUserById(id: number)  {
    let result = await getConnection().getRepository(User).findOne({ where: { id : id, isActive: true}});
    return result;
  }

  
  export async function getUserByEmail(email: string)  {
    let result = await getConnection().getRepository(User).findOne({ where: { email : email, isActive: true }});
    return result;
  }


  // To support autocomplete features
  // STUB
  export async function getUsersByNamePrefix(prefix: string)  {
    
    return [];
  }


  export async function deactivateUser(user: User) {

  }