import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

const SECRET_KEY = 'your_secret_key';  // Replace with an environment variable in production
const REFRESH_SECRET_KEY = 'your_refresh_secret_key';  // Replace with an environment variable in production

// Mock user data
const users = [
    { username: 'user1', password: '$2a$10$7aBcXc7uTz2xxN4e5wMePeCkQWyEoZGehCz60GFECqvKStjO.OsD2' }  // password is "password123"
];

// Generate tokens
function generateTokens(username: string) {
    const accessToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ username }, REFRESH_SECRET_KEY, { expiresIn: '1d' });
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

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
