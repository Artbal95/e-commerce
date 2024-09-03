import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV}` })


console.log(process.env.NODE_ENV)

export const PORT = process.env.PORT || 5000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_NAME = process.env.DB_NAME || "e-commerce";
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
