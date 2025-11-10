import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Player from "@/app/models/Player";

export async function POST(req: NextRequest) {
    await connectDB();

    const { ign, uuid, hwid } = await req.json();

    if (!ign || !uuid) {
        return NextResponse.json({ error: "IGN and UUID required" }, { status: 400 });
    }

    try {
        let player = await Player.findOne({ uuid });

        if (player) {
            if (player.isBanned) {
                return NextResponse.json({
                    error: "banned",
                    reason: player.banReason || "You are banned from this client"
                }, { status: 403 });
            }

            player.isOnline = true;
            player.lastSeen = new Date();
            if (hwid && !player.hwid) player.hwid = hwid;
            await player.save();
        } else {
            player = await Player.create({
                ign,
                uuid,
                hwid: hwid || null,
                isOnline: true,
            });
        }

        return NextResponse.json({ success: true, player });
    } catch (error) {
        console.error("Register player error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await connectDB();

    try {
        const { uuid } = await req.json();

        if (!uuid) {
            return NextResponse.json({ error: "UUID required" }, { status: 400 });
        }

        await Player.findOneAndUpdate(
            { uuid },
            {
                isOnline: false,
                lastSeen: new Date()
            }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Player disconnect error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}