import { NextRequest, NextResponse } from "next/server";

type AvatarPayload = {
    userId: string;
    username: string;
    avatarUrl: string;
};

export async function POST(req: NextRequest) {
    try {
        const body: AvatarPayload = await req.json();

        if (!body.userId || !body.avatarUrl) {
            return NextResponse.json(
                { error: "Invalid payload" },
                { status: 400 }
            );
        }

        // TODO: save to DB / file / CMS
        // example:
        // await prisma.discordAvatar.upsert(...)

        return NextResponse.json({ success: true });
    } catch (_e) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
