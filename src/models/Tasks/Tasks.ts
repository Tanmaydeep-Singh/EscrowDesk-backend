// models/Task.ts
import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  project: Types.ObjectId;
  name: string;
  description?: string;
  status: "pending" | "in-progress" | "done";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    name: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["pending", "in-progress", "done"], default: "pending" },
    dueDate: Date,
  },
  { timestamps: true }
);

export default model<ITask>("Task", TaskSchema);
