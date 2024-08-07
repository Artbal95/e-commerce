import express from "express";
import validationMiddleware from "../../middlewares/validation";
import { signup, recoverPassword, sendLink } from "../../controllers/auth";
import {
  SignupSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "../../schema/auth";

const router = express.Router();

router.post("/signup", validationMiddleware(SignupSchema), signup); /*
router.post("/signin", validationMiddleware(SigninSchema), signin); */
router.post("/forgot", validationMiddleware(ForgotPasswordSchema), sendLink);
router.post(
  "/recover",
  validationMiddleware(ResetPasswordSchema),
  recoverPassword
);

export default router;
