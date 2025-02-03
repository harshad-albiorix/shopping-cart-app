import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const filePath = path.join(process.cwd(), 'users.json');


const readUsers = (): { firstName: string; lastName: string; email: string; password: string }[] => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};


const writeUsers = (users: { firstName: string; lastName: string; email: string; password: string }[]) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
};

export async function POST(request: Request) {
    const { firstName, lastName, email, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const users = readUsers();

    if (users.some(user => user.email === email)) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ firstName, lastName, email, password: hashedPassword });

    writeUsers(users);

    return NextResponse.json({ message: 'User registered successfully', data: null }, { status: 201 });
}
