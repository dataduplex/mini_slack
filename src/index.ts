import "reflect-metadata";
import {createConnection} from "typeorm";
import * as TeamServices from "./services/TeamService";
import * as AdminServices from "./services/AdminService";
import * as UserServices from "./services/UserService";
import { Team } from "./entity/Team";
import { User } from "./entity/User";
import { UserSettings } from "./entity/UserSettings";



createConnection().then(connection => {
    console.log("Connection is created");
    //console.log(connection);
    // here you can start to work with your entities
    //callDatabaseServices();
    
}).catch(error => console.log(error));


/*async function callDatabaseServices() {

}*/



