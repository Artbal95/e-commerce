import "reflect-metadata"
import app from "./root/app";
import {PORT} from "./config/environment";
import myDataSource from "./config/db";

(async () => {
    try {
        await myDataSource.initialize()
        console.log("Data Source has been initialized!")
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT} Port`);
        });
    } catch (e) {
        console.error("Error during Data Source initialization:", e)
    }
})()
