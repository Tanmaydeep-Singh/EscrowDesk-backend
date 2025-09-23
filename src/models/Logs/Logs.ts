// models/Log.ts
import { Schema, model, Document, Types } from "mongoose";

export interface ILog extends Document {
  project: Types.ObjectId;   
  user: Types.ObjectId;
  metadata: string;
    entityType: "User" | "Task" | "Project" | "Document" | "System";
  action: string;
  timestamp: Date;
}

const LogSchema = new Schema<ILog>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    metadata: {type: String, required: true},
      entityType: { type: String, enum: ["User", "Task", "Project", "Document", "System"], required: true },

    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }
);

export default model<ILog>("Log", LogSchema);
