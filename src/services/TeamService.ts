import {getConnection} from "typeorm";
import {Team} from "../entity/Team";



export async function getTeamByName(name: string) {
    let result = await getConnection().getRepository(Team).findOne({ where: { name : name }});
    return result;
}

export async function checkTeamExistsByName(name: string)  {
    let team = await getConnection().getRepository(Team).findOne({ where: { name : name }});
    if(team) {
        return true;
    } else {
        return false;
    } 
}

export async function getTeamById(id: number) { }

