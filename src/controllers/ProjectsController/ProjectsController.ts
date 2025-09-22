// controllers/projectController.ts
import { Request, Response } from "express";
import Projects, { IProject } from "../../models/Projects/Projects";

// Create Project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project: IProject = new Projects({
      ...req.body,
      createdBy: (req as any).user.id,
    });
    await project.save();
    res.status(201).json(project);
  } catch (err: any) {
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
