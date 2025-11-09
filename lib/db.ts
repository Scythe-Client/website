import mongoose from "mongoose";
import {ENV} from "@/lib/env";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) return;
    if (!ENV.MONGODB_URI) throw new Error("MONGO_URI not set");

    await mongoose.connect(ENV.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected");
};
