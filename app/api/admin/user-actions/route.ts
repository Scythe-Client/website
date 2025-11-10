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
    const { userId, action } = body;

    if (!userId || !action) {
        return NextResponse.json({ error: "Missing userId or action" }, { status: 400 });
    }

    try {
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        switch (action) {
            case 'delete':
                await User.findByIdAndDelete(userId);

                if (targetUser.clerkId) {
                    const clerk = await clerkClient();
                    await clerk.users.deleteUser(targetUser.clerkId);
                }

                return NextResponse.json({ success: true, message: "User deleted successfully" });

            case 'suspend':
                // TODO: Implement suspend logic
                return NextResponse.json({ success: true, message: "Suspend not implemented yet" });

            case 'ban':
                // TODO: Implement ban logic
                return NextResponse.json({ success: true, message: "Ban not implemented yet" });

            case 'ip-ban':
                // TODO: Implement IP ban logic
                return NextResponse.json({ success: true, message: "IP ban not implemented yet" });

            case 'reset-password':
                // TODO: Implement password reset logic
                return NextResponse.json({ success: true, message: "Password reset not implemented yet" });

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error) {
        console.error("User action error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}