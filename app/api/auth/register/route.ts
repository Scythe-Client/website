import { NextRequest, NextResponse } from 'next/server';
import ClientUser from '@/app/models/ClientUser';
import { connectDB } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await ClientUser.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
        }

        // Create new user
        const user = new ClientUser({ username, password });
        await user.save();

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}