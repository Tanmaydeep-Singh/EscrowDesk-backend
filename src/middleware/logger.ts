import { Request, Response, NextFunction } from "express";
import Logs from "../models/Logs/Logs";

export const loggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.path === "/health") return next();

    const log = new Logs({
      action: `${req.method} ${req.path}`,
      userId: (req as any).user?._id,
      projectId: req.params.projectId || undefined,
      entityType: "System",
      metadata: {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
      },
    });

    await log.save();
  } catch (err) {
    console.error("Logger failed:", err);
  }

  next();
};
