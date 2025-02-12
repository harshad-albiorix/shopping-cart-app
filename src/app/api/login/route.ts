import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';  // Make sure to use an environment variable for the secret key in production

const filePath = path.join(process.cwd(), 'users.json');

const readUsers = (): { firstName: string; lastName: string; email: string; password: string }[] => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const users = readUsers();

    const user = users.find(user => user.email === email);
    if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
        { email: user.email, firstName: user.firstName, lastName: user.lastName },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    // Set the JWT token as an HTTP-only cookie
    const response = NextResponse.json(
        { message: 'Login successful', data: { token, user: { email: user.email, firstName: user.firstName, lastName: user.lastName } } },
        { status: 200 }
    );

    return response;
}
