import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import jwt from 'jsonwebtoken';
import { timingSafeEqual } from "crypto";
import Gate from "@/app/models/Gate";

const SECRET_KEY = process.env.GATEA_PANEL_ACCESS_KEY;

if (!SECRET_KEY) throw new Error('SECRET_KEY is not defined in environment');

export async function POST(req: NextRequest) {
    await connectDB();

    const body = await req.json();
    const { gateAId, userId, token } = body;

    if (!userId || typeof userId !== 'string') return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
    if (gateAId && typeof gateAId !== 'string') return NextResponse.json({ error: "Invalid gateAId" }, { status: 400 });
    if (!gateAId && (!token || typeof token !== 'string')) return NextResponse.json({ error: "Invalid or missing token" }, { status: 400 });

    function safeCompare(a: string, b: string): boolean {
        const encoder = new TextEncoder();
        const aBuf = encoder.encode(a);
        const bBuf = encoder.encode(b);
        if (aBuf.length !== bBuf.length) return false;
        return timingSafeEqual(aBuf, bBuf);
    }

    function createPanelAccessResponse(userId: string, message: string) {
        const secondaryAuthToken = jwt.sign(
            { gatePassed: true, clerkId: userId },
            SECRET_KEY!,
            { expiresIn: '1h' }
        );
        const response = NextResponse.json({ message }, { status: 200 });
        response.cookies.set('panel_access', secondaryAuthToken, {
            httpOnly: true,
            path: '/',
            maxAge: 3600,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });
        return response;
    }

    if (!gateAId) {
        const user = await User.findOne({ clerkId: userId });
        if (!user) return NextResponse.json({ error: "User not found", status: 401 });
        if (!user.token) return NextResponse.json({ error: "Token not found", status: 401 });
        if (!safeCompare(token, user.token)) return NextResponse.json({ error: "Invalid Token", status: 401 });
        return createPanelAccessResponse(userId, 'Panel gate successfully opened.');
    } else {
        const gate = await Gate.findOne({ gatea_id: gateAId, isActive: true });
        if (!gate) return NextResponse.json({ error: "Unauthorized or inactive gate" }, { status: 403 });
        await Gate.findOneAndUpdate({ gatea_id: gateAId }, { $set: { lastSeen: new Date() } });
        const user = await User.findOne({ clerkId: userId });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        return createPanelAccessResponse(userId, 'Panel access granted via Gate A.');
    }
}