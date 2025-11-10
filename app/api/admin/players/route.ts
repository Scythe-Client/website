import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Player from "@/app/models/Player";

const ADMIN_ROLES = ["OWNER", "DEVELOPER", "ADMIN"];

export async function GET(req: NextRequest) {
    await connectDB();

    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const role = (user.publicMetadata.role as string) || "";
        if (!ADMIN_ROLES.includes(role)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const search = req.nextUrl.searchParams.get("search") || "";
        const players = await Player.find({
            $or: [
                { ign: { $regex: search, $options: "i" } },
                { uuid: { $regex: search, $options: "i" } },
            ],
        }).sort({ lastSeen: -1 });

        return NextResponse.json(players);
    } catch (error) {
        console.error("Get players error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    await connectDB();

    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const role = (user.publicMetadata.role as string) || "";
        if (!ADMIN_ROLES.includes(role)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();
        const { playerId, role: newRole } = body;

        const allowedRoles = ["OWNER", "DEVELOPER", "ADMIN", "STAFF", "PARTNER", "DONATOR", "BETA TESTER", "DEFAULT"];
        if (!allowedRoles.includes(newRole)) {
            return NextResponse.json({ error: "Invalid role" }, { status: 400 });
        }

        const updated = await Player.findByIdAndUpdate(playerId, { role: newRole }, { new: true });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update player error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}