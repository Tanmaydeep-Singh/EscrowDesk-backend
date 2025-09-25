// controllers/clientController.ts
import { Request, Response } from "express";
import Clients from "../../models/Clients/Clients";
import Projects from "../../models/Projects/Projects";


// ✅ Create new client
export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, company } = req.body;
    const client = await Clients.create({
         name,
         email,
         company,
         projects: [],
       });
    res.status(201).json(client);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all clients
export const getAllClients = async (_req: Request, res: Response) => {
  try {
    const clients = await Clients.find().populate("projects", "name status deadline");
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get client by ID
export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Clients.findById(req.params.id).populate("projects", "name status deadline");
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update client
export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = await Clients.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("projects", "name status deadline");
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete client
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Clients.findByIdAndDelete(req.params.id);

    if (client) {
      // optional: unlink this client from its projects
      await Projects.updateMany({ _id: { $in: client.projects } }, { $unset: { client: "" } });
    }

    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
