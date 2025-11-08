import mongoose from "mongoose";
import { ENV } from "./env"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGODB_URI!);
        console.log("Connected to MonogoDB", conn.connection.host);
    } catch (err) {
        console.error("Error connecting to MonogDB", err);
        process.exit(1);
    }
}