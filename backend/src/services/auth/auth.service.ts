import AuthEntity from "../../entity/auth";
import myDataSource from "../../config/db";
import { UserData } from "types/user.data";

export const authGetUserByEmail = async (email: string) => {
  try {
    return await myDataSource.getRepository(AuthEntity).findOneBy({ email });
  } catch (e: unknown) {
    throw new Error("Error during get user by email");
  }
};

export const authSignUp = async (
  body: Omit<AuthEntity, "id" | "created_at" | "updated_at">
) => {
  try {
    const auth = myDataSource.getRepository(AuthEntity).create(body);
    return await myDataSource.getRepository(AuthEntity).save(auth);
  } catch (e: unknown) {
    throw new Error("Error during Sign Up");
  }
};

export const authUpdateUser = async (userData: UserData) => {
  try {
    return await myDataSource
      .createQueryBuilder()
      .update("Users")
      .set({ password: userData.password })
      .where("email = :email", { email: userData.email })
      .execute();
  } catch (err: unknown) {
    console.error(err);
    throw new Error("Error during Update");
  }
};
