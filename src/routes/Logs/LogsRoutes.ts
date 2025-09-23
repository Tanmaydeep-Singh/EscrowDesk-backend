import { Router } from "express";
import { getProjectLogs, getUserLogs } from "../../controllers/LogsController/LogsController";

const router = Router();

router.get("/:userId", getUserLogs);
router.get("/:projectId", getProjectLogs);

export default router;
