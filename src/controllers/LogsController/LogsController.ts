import { Request, Response } from "express";
import Logs from "../../models/Logs/Logs";

export const getUserLogs = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const logs = await Logs.find({ userId }).sort({ timestamp: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get logs for a specific project
export const getProjectLogs = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const logs = await Logs.find({ projectId }).sort({ timestamp: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
