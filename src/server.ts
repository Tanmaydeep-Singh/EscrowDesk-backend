import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

import projectRoutes from "./routes/Projects/ProjectsRoute";
import tasksRoutes from "./routes/Tasks/TasksRouter";
// import authRoutes from "./routes/auth";
// import escrowRoutes from "./routes/escrow";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// app.get("/health", (_req, res) => res.send("API running"));

// app.use("/api/auth", authRoutes);
// app.use("/api/escrows", escrowRoutes);

app.get("/", (req, res) => {

    res.send("Hello world")
})
// routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", tasksRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
