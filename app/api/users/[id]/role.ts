import { NextApiRequest, NextApiResponse } from "next";
import {connectDB} from "@/lib/db";
import User from "@/app/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    const { id } = req.query;

    if (req.method === "PATCH") {
        const { role } = req.body;
        if (!role) return res.status(400).json({ error: "Role is required" });

        const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("email name role");
        if (!user) return res.status(404).json({ error: "User not found" });

        return res.status(200).json(user);
    }

    res.status(405).json({ error: "Method not allowed" });
}
