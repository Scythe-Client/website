import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    ign: { type: String, required: true },
    uuid: { type: String, required: true, unique: true },
    hwid: { type: String, default: null },
    role: {
        type: String,
        enum: ['OWNER', 'DEVELOPER', 'ADMIN', 'STAFF', 'PARTNER', 'DONATOR', 'BETA TESTER', 'DEFAULT'],
        default: 'DEFAULT'
    },
    isOnline: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    banReason: { type: String, default: null },
    lastSeen: { type: Date, default: Date.now },
    firstSeen: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Player || mongoose.model('Player', playerSchema);