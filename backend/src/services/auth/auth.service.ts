import { AuthEntity, RecoverEntity } from "../../entity/auth";
import myDataSource from "../../config/db";
import { UserData } from "../../types";

export const authGetUserByEmail = async (email: string) => {
  try {
    return await myDataSource.getRepository(AuthEntity).findOneBy({ email });
  } catch (e: unknown) {
    console.error(e);
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
    console.error(e);
    throw new Error("Error during Sign Up");
  }
};

export const authUpdateUser = async (userData: UserData) => {
  try {
    return await myDataSource
      .createQueryBuilder()
      .update("User")
      .set({ password: userData.password })
      .where("id = :id", { id: userData.id })
      .execute();
  } catch (err: unknown) {
    console.error(err);
    throw new Error("Error during Sign Up");
  }
};

export const createRecoverCode = async (
  data: Omit<RecoverEntity, number | string>
) => {
  try {
    const recoverCode = myDataSource.getRepository(RecoverEntity).create(data);
    return await myDataSource.getRepository(RecoverEntity).save(recoverCode);
  } catch (e: unknown) {
    console.error(e);
    throw new Error("Error during Sign Up");
  }
};

export const getUserIdByCode = async (code: any) => {
  try {
    return await myDataSource.getRepository(RecoverEntity).findOneBy({ code });
  } catch (e: unknown) {
    console.error(e);
    throw new Error("Error during get user by code");
  }
};
