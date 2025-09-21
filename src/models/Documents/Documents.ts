// models/Document.ts
import { Schema, model, Document as MDocument, Types } from "mongoose";

export interface IDocument extends MDocument {
  project: Types.ObjectId;
  title: string;
  description?: string;
  type: "srs" | "nda" | "agreement" | "other"; 
  ipfsHash: string; 
  uploadedBy: Types.ObjectId; 

  signers: {
    user: Types.ObjectId;   
    walletAddress: string;  
    signedAt?: Date;        
  }[];

  status: "draft" | "pending" | "signed" | "rejected";

  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["srs", "nda", "agreement", "other"], default: "other" },
    ipfsHash: { type: String, required: true }, 
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    signers: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        walletAddress: { type: String, required: true },
        signedAt: { type: Date },
      },
    ],

    status: {
      type: String,
      enum: ["draft", "pending", "signed", "rejected"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default model<IDocument>("Document", DocumentSchema);
