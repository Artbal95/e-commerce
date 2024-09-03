import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV}` })

export const PORT = process.env.PORT || 5000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_NAME = process.env.DB_NAME || "e-commerce";
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || "postgres";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "postgres";
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || "postgres";
