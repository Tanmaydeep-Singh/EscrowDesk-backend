// controllers/documentController.ts
import { Request, Response } from "express";
import Projects from "../../models/Projects/Projects";
import Documents from "../../models/Documents/Documents";

// ✅ Create a new document
export const createDocument = async (req: Request, res: Response) => {
  try {
    const document = new Documents(req.body);
    const savedDocument = await document.save();

    // Link document to the project
    await Projects.findByIdAndUpdate(document.project, {
      $push: { documents: savedDocument._id }
    });

    res.status(201).json(savedDocument);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all documents
export const getAllDocuments = async (_req: Request, res: Response) => {
  try {
    const documents = await Documents.find()
      .populate("project", "name")
      .populate("uploadedBy", "name email")
      .populate("signers.user", "name email");

    res.json(documents);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get document by ID
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const document = await Documents.findById(req.params.id)
      .populate("project", "name")
      .populate("uploadedBy", "name email")
      .populate("signers.user", "name email");

    if (!document) return res.status(404).json({ message: "Document not found" });
    res.json(document);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update document
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const document = await Documents.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("project", "name")
      .populate("uploadedBy", "name email")
      .populate("signers.user", "name email");

    if (!document) return res.status(404).json({ message: "Document not found" });
    res.json(document);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete document
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const document = await Documents.findByIdAndDelete(req.params.id);

    if (document) {
      await Projects.findByIdAndUpdate(document.project, {
        $pull: { documents: document._id }
      });
    }

    if (!document) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
