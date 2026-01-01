import { NextRequest, NextResponse } from 'next/server';
import Player from '@/app/models/Player';
import { connectDB } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ uuid: string }> }
) {
    try {
        await connectDB();

        const { uuid } = await params;

        if (!uuid) {
            return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
        }

        const player = await Player.findOne({ uuid });

        if (!player) {
            return NextResponse.json({ error: 'Player not found' }, { status: 404 });
        }

        // Return the player's role as the rank
        return NextResponse.json({
            uuid: player.uuid,
            rank: player.role,
            ign: player.ign
        }, { status: 200 });
    } catch (error) {
        console.error('Rank lookup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}