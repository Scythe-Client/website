import { connectDB } from "@/lib/db";
import Gate from "@/app/models/Gate";

export async function registerGate() {
    await connectDB();

    const gatea_id = "sc_gatea_35561a70b6262d63fb1fb220409299653da0bac3e9731488";

    const existing = await Gate.findOne({ gatea_id });
    if (existing) {
        console.log(`⚠️ Gate already exists: ${gatea_id}`);
        return;
    }

    const newGate = new Gate({
        gatea_id,
        name: "Tubqnkyo",
        isActive: true,
        lastSeen: null,
        createdAt: new Date()
    });

    try {
        await newGate.save();
        console.log(`✅ Gate registered successfully:`);
        console.log(newGate);
    } catch (err: any) {
        console.error("❌ Failed to register gate:", err.message);
        if (err.errors) {
            console.error("Validation errors:", err.errors);
        }
    }
}

registerGate().catch(console.error);