import mongoose, { Schema, Document } from 'mongoose';

export interface IGate extends Document {
    name: string;
    gatea_id: string;
    isActive: boolean;
    lastSeen?: Date;
}

const gateSchema = new Schema<IGate>({
    name: { type: String, required: true },
    gatea_id: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
    lastSeen: Date,
}, {
    timestamps: true,
});

const Gate = mongoose.models.Gate || mongoose.model<IGate>('Gate', gateSchema);
export default Gate;