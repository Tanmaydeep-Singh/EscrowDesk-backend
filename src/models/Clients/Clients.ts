// models/User.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IClient extends Document {
    name: string;
    walletAddress: string;
    projects: Types.ObjectId[];
    clients: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
    {
        name: { type: String, required: true },
        walletAddress: { type: String, required: true, unique: true },
        projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    },
    { timestamps: true }
);

export default model<IClient>("Client", ClientSchema);
