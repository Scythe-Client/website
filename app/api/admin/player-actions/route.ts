import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Player from "@/app/models/Player";

const ADMIN_ROLES = ["OWNER", "DEVELOPER", "ADMIN"];

export async function POST(req: NextRequest) {
    await connectDB();

    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = (user.publicMetadata.role as string) || "";
    if (!ADMIN_ROLES.includes(role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { playerId, action, reason } = body;

    if (!playerId || !action) {
        return NextResponse.json({ error: "Missing playerId or action" }, { status: 400 });
    }

    try {
        const player = await Player.findById(playerId);
        if (!player) {
            return NextResponse.json({ error: "Player not found" }, { status: 404 });
        }

        switch (action) {
            case 'hwid-ban':
                player.isBanned = true;
                player.banReason = reason || "Banned by administrator";
                player.isOnline = false;
                await player.save();

                return NextResponse.json({ success: true, message: "Player HWID banned successfully" });

            case 'unban':
                player.isBanned = false;
                player.banReason = null;
                await player.save();

                return NextResponse.json({ success: true, message: "Player unbanned successfully" });

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error) {
        console.error("Player action error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}