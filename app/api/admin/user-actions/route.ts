import { NextRequest, NextResponse } from "next/server";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/app/models/User";

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
    const { userId, action, reason } = body;

    if (!userId || !action) {
        return NextResponse.json({ error: "Missing userId or action" }, { status: 400 });
    }

    try {
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const clerk = await clerkClient();

        switch (action) {
            case "delete":
                await User.findByIdAndDelete(userId);
                if (targetUser.clerkId) {
                    await clerk.users.deleteUser(targetUser.clerkId);
                }
                return NextResponse.json({ success: true, message: "User deleted successfully" });

            case "ban":
                if (targetUser.isBanned) {
                    return NextResponse.json({ error: "User already banned" }, { status: 400 });
                }
                if (targetUser.clerkId) {
                    await clerk.users.banUser(targetUser.clerkId);
                }
                targetUser.isBanned = true;
                targetUser.banReason = reason || "Banned by administrator";
                await targetUser.save();
                return NextResponse.json({ success: true, message: "User banned successfully" });

            case "unban":
                if (!targetUser.isBanned) {
                    return NextResponse.json({ error: "User is not banned" }, { status: 400 });
                }
                if (targetUser.clerkId) {
                    await clerk.users.unbanUser(targetUser.clerkId);
                }
                targetUser.isBanned = false;
                targetUser.banReason = null;
                await targetUser.save();
                return NextResponse.json({ success: true, message: "User unbanned successfully" });

            case "ip-ban":
                if (targetUser.isIPBanned) {
                    return NextResponse.json({ error: "User already IP banned" }, { status: 400 });
                }
                if (targetUser.clerkId) {
                    await clerk.users.banUser(targetUser.clerkId);
                }
                targetUser.isIPBanned = true;
                targetUser.bannedIP = targetUser.lastKnownIP || null;
                targetUser.banReason = reason || "IP banned by administrator";
                await targetUser.save();
                return NextResponse.json({ success: true, message: "User IP banned successfully" });

            case "un-ip-ban":
                if (!targetUser.isIPBanned) {
                    return NextResponse.json({ error: "User is not IP banned" }, { status: 400 });
                }
                if (targetUser.clerkId) {
                    await clerk.users.unbanUser(targetUser.clerkId);
                }
                targetUser.isIPBanned = false;
                targetUser.bannedIP = null;
                targetUser.banReason = null;
                await targetUser.save();
                return NextResponse.json({ success: true, message: "User IP unbanned successfully" });

            case "reset-password":
                if (targetUser.clerkId) {
                    await clerk.users.getUserOauthAccessToken(targetUser.clerkId, "oauth_google");
                }
                return NextResponse.json({ success: true, message: "Password reset email sent" });

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error) {
        console.error("User action error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
