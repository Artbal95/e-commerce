import AuthEntity from "../../entity/auth";
import myDataSource from "../../config/db";

export const authGetUserByEmail = async (email: string) => {
    try {
        return await myDataSource.getRepository(AuthEntity).findOneBy({ email })
    } catch (e: unknown) {
        console.error(e);
        throw new Error("Error during get user by email");
    }
}

export const authSignUp = async (body: Omit<AuthEntity, "id" | "created_at" | "updated_at">) => {
    try {
        const auth = myDataSource.getRepository(AuthEntity).create(body);
        return await myDataSource.getRepository(AuthEntity).save(auth)
    } catch (e: unknown) {
        console.error(e);
        throw new Error("Error during Sign Up");
    }
}


