import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.GATEA_PANEL_ACCESS_KEY;

if (!SECRET_KEY) throw new Error('SECRET_KEY is not defined');

export async function GET(req: NextRequest) {
    const token = req.cookies.get('panel_access')?.value;

    if (!token) {
        return NextResponse.json({ valid: false }, { status: 401 });
    }

    try {
        jwt.verify(token, SECRET_KEY!);
        return NextResponse.json({ valid: true }, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return NextResponse.json({ valid: false }, { status: 401 });
    }
}