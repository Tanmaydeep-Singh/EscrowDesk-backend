// routes/projectRoutes.js
import express from "express";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../../controllers/ProjectsController/ProjectsController";


const router = express.Router();

// /api/projects
router.post("/",createProject ); // Create
router.get("/",getProjects ); // Get projects
router.get("/project/:id", getProjectById); // Get project by ID
router.put("/project/:id", updateProject); // Update
router.delete("/:id", deleteProject); // Delete


export default router;
