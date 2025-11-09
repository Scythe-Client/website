import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        profileImage: { type: String, default: "" },
        clerkId: { type: String, required: true, unique: true },
        role: {
            type: String,
            enum: ['OWNER', 'DEVELOPER', 'ADMIN', 'STAFF', 'PARTNER', 'DONATOR', 'BETA TESTER', 'DEFAULT'],
            default: 'DEFAULT',
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
