import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET as string;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET as string;

// Mock user data with hashed password ("password123")
const users = [
    { username: 'user1', password: '$2a$10$7aBcXc7uTz2xxN4e5wMePeCkQWyEoZGehCz60GFECqvKStjO.OsD2' }  
];

// Generate tokens
function generateTokens(username: string) {
    const accessToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ username }, REFRESH_SECRET_KEY, { expiresIn: '1y' });
    return { accessToken, refreshToken };
}

// Login route
app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokens = generateTokens(username);
    return res.json(tokens);
});

// Registration route (optional)
app.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    const tokens = generateTokens(username);
    return res.status(201).json({
        message: "Registered successfully",
        ...tokens
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
