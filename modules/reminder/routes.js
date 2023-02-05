import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import ReminderController from "./controller.js";
const router = Router();

router.get("/", isAuthenticated, catchAsync(ReminderController.getAllReminders));

router.post("/", isAuthenticated, catchAsync(ReminderController.createReminder));

export default router;
