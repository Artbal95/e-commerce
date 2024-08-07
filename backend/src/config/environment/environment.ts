import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 5000;
export const FR_RECOVER_URL = process.env.FR_RECOVER_URL || "";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || "";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
