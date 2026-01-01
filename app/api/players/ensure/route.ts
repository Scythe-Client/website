import { NextRequest, NextResponse } from 'next/server';
import Player from '@/app/models/Player';
import { connectDB } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { uuid, username, clientVersion } = await request.json();

        if (!uuid) {
            return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
        }

        // Find or create player
        let player = await Player.findOne({ uuid });

        if (player) {
            // Update last seen and ign if provided
            player.lastSeen = new Date();
            if (username) {
                player.ign = username;
            }
            await player.save();
        } else {
            // Create new player
            player = new Player({
                uuid,
                ign: username || 'Unknown',
                firstSeen: new Date(),
                lastSeen: new Date(),
            });
            await player.save();
        }

        return NextResponse.json({
            message: 'Player record ensured',
            player: {
                uuid: player.uuid,
                ign: player.ign,
                role: player.role,
                isOnline: player.isOnline
            }
        }, { status: 200 });
    } catch (error) {
        console.error('Ensure player error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}