// models/Task.ts
import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  project: Types.ObjectId;
  user: Types.ObjectId;       // Assignee
  name: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "done";
  dueDate?: Date;
  milestone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project"},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assignee
    name: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    status: { type: String, enum: ["pending", "in-progress", "done"], default: "pending" },
    dueDate: Date,
    milestone: String,
  },
  { timestamps: true }
);

export default model<ITask>("Task", TaskSchema);
