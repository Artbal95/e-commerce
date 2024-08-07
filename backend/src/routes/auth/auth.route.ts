import express from "express";
import validationMiddleware from "../../middlewares/validation";
import { register, recoverPassword, sendLink } from "../../controllers/auth";
import {
  RegisterSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "../../schema/auth";

const router = express.Router();

router.post("/signup", validationMiddleware(RegisterSchema), register); /*
router.post("/signin", validationMiddleware(SigninSchema), signin); */
router.post("/forgot", validationMiddleware(ForgotPasswordSchema), sendLink);
router.post(
  "/recover",
  validationMiddleware(ResetPasswordSchema),
  recoverPassword
);

export default router;
