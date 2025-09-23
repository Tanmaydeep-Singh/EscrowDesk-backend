import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

import projectRoutes from "./routes/Projects/ProjectsRoute";
import tasksRoutes from "./routes/Tasks/TasksRouter";
import documentsRoutes from "./routes/Documents/DocumentsRoutes";
import clientsRoutes from "./routes/Clients/ClientsRoutes"
import logsRoutes from "./routes/Logs/LogsRoutes"
import { loggerMiddleware } from "./middleware/logger";


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
app.use("/api/projects",loggerMiddleware, projectRoutes); /// Projects
app.use("/api/tasks",loggerMiddleware, tasksRoutes); /// Tasks
app.use("/api/documents",loggerMiddleware, documentsRoutes); /// Documents
app.use("/api/clients", clientsRoutes); /// Documents
app.use("/api/logs",logsRoutes); // Logs




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
