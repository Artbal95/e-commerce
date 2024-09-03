import { DataSource } from "typeorm"
import { join } from "path"
import {DB_HOST, DB_PASSWORD, DB_USERNAME} from "../environment";

const myDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "e-commerce",
    entities: [join(__dirname, "../../", "entity/*/*.entity{.ts,.js}")],
    logging: false,
    synchronize: true,
})

export default myDataSource;
