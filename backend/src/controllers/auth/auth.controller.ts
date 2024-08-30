import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, {hashSync} from 'bcrypt';
import {authGetUserByEmail, authSignUp} from "../../services/auth";
import {LoginSchema, RegisterSchema} from "../../schema/auth";

const SECRET_KEY = process.env.JWT_SECRET as string;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET as string;

// Generate tokens
function generateTokens(username: string, email: string) {
    const accessToken = jwt.sign({ username, email }, SECRET_KEY, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ username, email }, REFRESH_SECRET_KEY, { expiresIn: '1y' });
    return { accessToken, refreshToken };
}

// Login route
export const login = async (req: Request<{}, {}, LoginSchema>, res: Response) => {
    const { email, password } = req.body;

  const candidate = await authGetUserByEmail(email);

    if (!candidate) {
        return res.status(400).json({ status: "VALIDATION_ERROR", result: null, error: 'Invalid credentials' });
    }

    const passwordIsValid = await bcrypt.compare(password, candidate.password);
    if (!passwordIsValid) {
        return res.status(400).json({ result: null, error: 'Invalid credentials' });
    }

    const tokens = generateTokens(candidate.username, email);
    return res.status(200).json({ result: tokens, error: null });
};

// Registration route (optional)
export const register = async (req: Request<{}, {}, RegisterSchema>, res: Response) => {
    const { username, email, password } = req.body;

    const candidate = await authGetUserByEmail(email);
    if (candidate) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = hashSync(password, 10);
    await authSignUp({ email, password: hashedPassword, username });
    const tokens = generateTokens(username, email)
    return res.status(201).json({
        status: "SUCCESS",
        data: tokens,
        error: null
    });
};
