import usersMockData from "./users.mock.json"
import {authSignUp} from "../../services/auth";
import {hashSync} from "bcrypt";

const usersSeed = async () => {
    try {
        for (const user of usersMockData) {
            const password = hashSync(user.password, 10);
            await authSignUp({ ...user, password })
        }
        console.log("Users Successfully Added")
    } catch (_) {
        console.log("Users Seeds Error")
    }
}

export default usersSeed;
