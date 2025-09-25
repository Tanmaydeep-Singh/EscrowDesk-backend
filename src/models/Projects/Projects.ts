// models/Project.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IProject extends Document {
    name: string;
    description: string;
    budget?:number;
    client: Types.ObjectId;
    tasks: Types.ObjectId[];
    logs: Types.ObjectId[];
    documents:Types.ObjectId[];
    progress: number;
    status: "pending" | "in-progress" | "completed" | "cancelled";
    codeLink: string;
    liveLink: string;
    startDate:Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        name: { type: String, required: true },
        description: { type: String },
        budget: { type: Number },
        progress: { type: Number },
        client: { type: Schema.Types.ObjectId, ref: "Client"},
        tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
        logs: [{ type: Schema.Types.ObjectId, ref: "Log" }],
        documents: [{ type: Schema.Types.ObjectId, ref: "Document" }],
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed", "cancelled"],
            default: "pending",
        },
        codeLink: { type: String },
        liveLink: { type: String },
        startDate: Date,
        endDate:Date,
    },
    { timestamps: true }
);

export default model<IProject>("Project", ProjectSchema);
