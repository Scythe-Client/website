import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { ENV } from "@/lib/env"; // adjust import if needed

const clerk = clerkMiddleware();

export default async function middleware(
    req: NextRequest,
    event: Parameters<typeof clerkMiddleware>[1]
) {
    const res = await clerk(req, event);
    const response = res || NextResponse.next();

    response.headers.set("Access-Control-Allow-Origin", ENV.CLIENT_URL!);
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return new NextResponse(null, { status: 204, headers: response.headers });
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
