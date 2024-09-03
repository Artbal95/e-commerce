import usersSeed from "./users";
import myDataSource from "../config/db";
import {DB_HOST} from "../config/environment";


const seeds = async () => {
    try {
        await myDataSource.initialize()
        console.log(`Data Source has been initialized! to ${DB_HOST}`)
        await usersSeed()
    } catch (_) {
        console.log("Seeds Error")
    }
}

void seeds();
