// models/User.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  walletAddress: string;
  projects: Types.ObjectId[]; // projects user is associated with
  clients: Types.ObjectId[];  // if this user is a freelancer, their clients
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String},
    walletAddress: { type: String, required: true, unique: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
