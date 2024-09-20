import { Request, Response } from "express";
import bcrypt, { hashSync } from "bcrypt";
import {
  authGetUserByEmail,
  authSignUp,
  authUpdateUser,
} from "../../services/auth";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "../../schema/auth";
import generateToken from "../../utils/generateToken";
import sendEmail from "../../services/mail";
import { FR_RECOVER_URL } from "../../config/environment";
import forgotPasswordMail from "../../constants/forgot.password.mail";
import MailEnum from "../../enums/mail.enum";
import { IError } from "../../types/global";
import jwt from "jsonwebtoken";
import verifyToken from "../../utils/verifyToken";
import { TOKEN_SECRET_KEY } from "../../config/environment";

// Generate tokens
function generateTokens(username: string, email: string) {
  const accessToken = generateToken({ username, email }, { expiresIn: "1m" });
  const refreshToken = generateToken({ username, email }, { expiresIn: "1y" });
  return { accessToken, refreshToken };
}

// Login route
export const login = async (
  req: Request<{}, {}, LoginSchema>,
  res: Response
) => {
  const { email, password } = req.body;

  const candidate = await authGetUserByEmail(email);

  if (!candidate) {
    return res.status(400).json({
      status: "VALIDATION_ERROR",
      result: null,
      error: "Invalid credentials",
    });
  }

  const passwordIsValid = await bcrypt.compare(password, candidate.password);
  if (!passwordIsValid) {
    return res.status(400).json({ result: null, error: "Invalid credentials" });
  }

  const tokens = generateTokens(candidate.username, email);
  return res.status(200).json({ result: tokens, error: null });
};

// Registration route (optional)
export const register = async (
  req: Request<{}, {}, RegisterSchema>,
  res: Response
) => {
  const { username, email, password } = req.body;

  const candidate = await authGetUserByEmail(email);
  if (candidate) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = hashSync(password, 10);
  await authSignUp({ email, password: hashedPassword, username });
  const tokens = generateTokens(username, email);
  return res.status(201).json({
    status: "SUCCESS",
    data: tokens,
    error: null,
  });
};

//send email route for reset password
export const forgot = async (
  req: Request<{}, {}, ForgotPasswordSchema>,
  res: Response
) => {
  const { email } = req.body;

  try {
    const candidate = await authGetUserByEmail(email);

    if (!candidate) {
      res.status(404).json({ message: "User not found!" });
    } else {
      const username = candidate.username;
      const code = generateToken({ username, email }, { expiresIn: "1h" });
      const recoverUrl = new URL(FR_RECOVER_URL, "http://localhost:");
      recoverUrl.searchParams.set("code", code);

      const html = forgotPasswordMail(recoverUrl.href, username);

      await sendEmail({
        to: email,
        from: `"Yura Khachatryan" <yurakhachatryan3@gmail.com>`,
        subject: MailEnum.FORGOT_PASSWORD_SUBJECT,
        html,
      });

      res.status(201).json({
        message: "Email send successfully",
      });
    }
  } catch (e: unknown) {
    const { message } = e as IError;
    res
      .status(500)
      .json({ message: "INTERNAL_SERVER_ERROR", currentMsg: message });
  }
};

//reset password route
export const reset = async (
  req: Request<{}, {}, ResetPasswordSchema>,
  res: Response
) => {
  const { newPassword, repeatPassword } = req.body;

  if (newPassword === repeatPassword) {
    const hashedPassword = hashSync(newPassword, 10);

    const code: any = req.query.code;
    const verified = jwt.verify(code, TOKEN_SECRET_KEY);

    if (!verified) {
      res.status(400).json({ message: "Url is expired!" });
    }

    const decoded = verifyToken(code);
    if (!decoded || !(typeof decoded !== "string")) {
      res.status(500).json({ message: "Can not decode the code" });
    } else {
      const success = await authUpdateUser({
        password: hashedPassword,
        email: decoded.email,
      });

      if (success.affected === 0) {
        console.error("No rows were updated, check if the email exists.");
      }
      if (!success) {
        res.status(500).json({ message: "Could not update password!" });
      }
      res.status(201).json({ message: "Password was successfully updated!" });
    }
  }
};
