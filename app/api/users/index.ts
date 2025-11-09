import { NextApiRequest, NextApiResponse } from "next";
import User from "@/app/models/User";
import {connectDB} from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === "GET") {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = { email: { $regex: search, $options: "i" } };
        }
        const users = await User.find(query).select("email name role");
        return res.status(200).json(users);
    }

    res.status(405).json({ error: "Method not allowed" });
}
