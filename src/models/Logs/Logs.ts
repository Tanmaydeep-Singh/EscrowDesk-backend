// models/Log.ts
import { Schema, model, Document, Types } from "mongoose";

export interface ILog extends Document {
  project: Types.ObjectId;   
  user: Types.ObjectId;
  action: string;
  timestamp: Date;
}

const LogSchema = new Schema<ILog>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }
);

export default model<ILog>("Log", LogSchema);
