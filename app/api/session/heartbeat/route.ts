import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';
import { connectDB } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const user = await authenticate(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { clientVersion } = await request.json();

        // Here you could update user's last active time, log heartbeat, etc.
        // For now, just acknowledge

        return NextResponse.json({ message: 'Heartbeat received' }, { status: 200 });
    } catch (error) {
        console.error('Heartbeat error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}