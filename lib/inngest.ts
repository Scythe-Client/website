import { Inngest } from "inngest";
import {connectDB} from "@/lib/db";
import User from "@/app/models/User";

export const inngest = new Inngest({ id: "scythe-client"});

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        await connectDB();
        const { id, email_addresses, first_name, last_name, image_url } = event.data;
        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_addresses,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url,
        }
        await User.create(newUser);
    }
)

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await connectDB();
        const { id } = event.data;
        await User.deleteOne({ clerkId: id });
    }
)

export const functions = [syncUser, deleteUserFromDB];