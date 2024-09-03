import express from "express";
import validationMiddleware from "../../middlewares/validation";
import {LoginSchema, RegisterSchema} from "../../schema/auth";
import {login, register} from "../../controllers/auth";

const router = express.Router();

router.post("/signup", validationMiddleware(RegisterSchema), register);
router.post("/signin", validationMiddleware(LoginSchema), login);

export default router;
