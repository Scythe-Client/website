import { NextRequest, NextResponse } from "next/server";
import {clerkClient, currentUser} from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/app/models/User";

const ADMIN_ROLES = ["OWNER", "DEVELOPER", "ADMIN"];

export async function GET(req: NextRequest) {
    await connectDB();

    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = (user.publicMetadata.role as string) || "";
    if (!ADMIN_ROLES.includes(role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const search = req.nextUrl.searchParams.get("search") || "";
    const users = await User.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ],
    }).sort({ createdAt: -1 });

    return NextResponse.json(users);
}

export async function PATCH(req: NextRequest) {
    await connectDB();

    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const role = (user.publicMetadata.role as string) || "";
    if (!ADMIN_ROLES.includes(role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, role: newRole } = body;

    const allowedRoles = ["OWNER", "DEVELOPER", "ADMIN", "STAFF", "PARTNER", "DONATOR", "BETA TESTER", "DEFAULT"];
    if (!allowedRoles.includes(newRole)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const updated = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });

    if (updated?.clerkId) {
        const clerk = await clerkClient();
        await clerk.users.updateUserMetadata(updated.clerkId, {
            publicMetadata: { role: newRole }
        });
    }

    return NextResponse.json(updated);
}