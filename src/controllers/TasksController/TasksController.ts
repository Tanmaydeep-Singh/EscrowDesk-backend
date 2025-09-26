// controllers/taskController.ts
import { Request, Response } from "express";
import Tasks from "../../models/Tasks/Tasks";
import Projects from "../../models/Projects/Projects";

// ✅ Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId, userId, name, priority, status, dueDate, milestone } = req.body;


    const task = await Tasks.create({
      project: projectId,
      user: userId,
      name,
      priority,
      status,
      dueDate,
      milestone,
    });

    res.status(201).json(task);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all tasks
export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Tasks.find().populate("project");
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.findById(req.params.id).populate("project");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);

    if (task) {
      await Projects.findByIdAndUpdate(task.project, {
        $pull: { tasks: task._id }
      });
    }

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
