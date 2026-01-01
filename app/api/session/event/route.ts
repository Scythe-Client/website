import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Player from '@/app/models/Player';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        // For now, don't require auth for session events
        // const user = await authenticate(request);
        // if (!user) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const { clientVersion, event, playerName, playerUUID } = await request.json();

        if (!event) {
            return NextResponse.json({ error: 'Event is required' }, { status: 400 });
        }

        // Handle events
        if (event === 'game_start' && playerUUID) {
            const player = await Player.findOne({ uuid: playerUUID });
            if (player) {
                player.isOnline = true;
                player.lastSeen = new Date();
                await player.save();
                console.log(`Player ${playerUUID} (${player.ign}) set online`);
            }
        } else if (event === 'game_stop' && playerUUID) {
            const player = await Player.findOne({ uuid: playerUUID });
            if (player) {
                player.isOnline = false;
                player.lastSeen = new Date();
                await player.save();
                console.log(`Player ${playerUUID} (${player.ign}) set offline`);
            }
        }

        return NextResponse.json({ message: 'Event processed' }, { status: 200 });
    } catch (error) {
        console.error('Event error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}