// controllers/projectController.ts
import { Request, Response } from "express";
import Projects, { IProject } from "../../models/Projects/Projects";



export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Request Body:", req.body);

    const { name, description, budget, client, freelancer } = req.body;

    if (!name ) {
      res.status(400).json({ message: "Name is required" });
      return;
    }

    // Create project
    const project = await Projects.create({
      name,
      description,
      client: client || null,
      progress:0,
      tasks: [],
      logs: [],
      documents: [],
      status: "pending",
      codeLink: "",
      liveLink: "",
      budget,
    });

    res.status(201).json(project);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Get all projects
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Projects.find();
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findById(req.params.id).populate("members.user");
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
