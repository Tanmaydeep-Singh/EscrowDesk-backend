import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import projectRoutes from "./routes/Projects/ProjectsRoute";
import tasksRoutes from "./routes/Tasks/TasksRouter";
import documentsRoutes from "./routes/Documents/DocumentsRoutes";
import clientsRoutes from "./routes/Clients/ClientsRoutes";
import logsRoutes from "./routes/Logs/LogsRoutes";
import userRoutes from "./routes/User/UserRoutes";
import { loggerMiddleware } from "./middleware/logger";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // your Next.js URL
    credentials: true, // allow cookies/auth headers if needed
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", loggerMiddleware, tasksRoutes);
app.use("/api/documents", loggerMiddleware, documentsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
