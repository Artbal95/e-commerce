import usersSeed from "./users";
import myDataSource from "../config/db";


const seeds = async () => {
    try {
        await myDataSource.initialize()
        console.log("Data Source has been initialized!")
        await usersSeed()
    } catch (_) {
        console.log("Seeds Error")
    }
}

void seeds();
