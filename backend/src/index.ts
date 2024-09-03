import "reflect-metadata"
import app from "./root/app";
import {DB_HOST, PORT} from "./config/environment";
import myDataSource from "./config/db";

(async () => {
    try {
        await myDataSource.initialize()
        console.log(`Data Source has been initialized! to ${DB_HOST}`)
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT} Port`);
        });
    } catch (e) {
        console.error("Error during Data Source initialization:", e)
    }
})()
