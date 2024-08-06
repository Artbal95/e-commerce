import express from "express";
import authRoute from "../routes/auth/auth.route";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.use("/auth", authRoute);

export default app;
