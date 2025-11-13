import mongoose from "mongoose";
import {ENV} from "@/lib/env";

let isConnected = false;

export async function connectDB() {
    if (isConnected) return;

    const uri = ENV.MONGODB_URI;
    if (!uri) throw new Error("Missing MONGODB_URI env var");

    const db = await mongoose.connect(uri);
    isConnected = db.connections[0].readyState === 1;

    console.log("Connected to MongoDB");
}
