import express from "express";
import validationMiddleware from "../../middlewares/validation";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "../../schema/auth";
import { login, register, forgot, reset } from "../../controllers/auth";

const router = express.Router();

router.post("/signup", validationMiddleware(RegisterSchema), register);
router.post("/signin", validationMiddleware(LoginSchema), login);
router.post("/forgot", validationMiddleware(ForgotPasswordSchema), forgot);
router.post("/reset", validationMiddleware(ResetPasswordSchema), reset);

export default router;
