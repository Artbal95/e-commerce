import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 5000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_NAME = process.env.DB_NAME || "e-commerce";
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const EMAIL_ADDRESS =
  process.env.EMAIL_ADDRESS || "yurakhachatryan3@gmail.com";
export const EMAIL_PASSWORD =
  process.env.EMAIL_PASSWORD || "zplg quto vkts erbm";
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || "postgres";
export const FR_RECOVER_URL = process.env.FR_RECOVER_URL || "3000";
