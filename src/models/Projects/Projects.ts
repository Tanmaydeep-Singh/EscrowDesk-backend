// models/Project.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IProject extends Document {
    name: string;
    description: string;
    client: Types.ObjectId;
    freelancer?: Types.ObjectId;
    tasks: Types.ObjectId[];
    logs: Types.ObjectId[];
    documents:Types.ObjectId[];
    status: "pending" | "in-progress" | "completed" | "cancelled";
    codeLink: string;
    liveLink: string;
    deadline?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        name: { type: String, required: true },
        description: { type: String },
        client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
        freelancer: { type: Schema.Types.ObjectId, ref: "User" },
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
        deadline: Date,
    },
    { timestamps: true }
);

export default model<IProject>("Project", ProjectSchema);
