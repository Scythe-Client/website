import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
}