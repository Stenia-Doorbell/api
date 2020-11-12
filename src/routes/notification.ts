import { Router } from "express";
import NotificationController from '../controllers/NotificationController';

const router = Router();
//Subscribe to notification
router.post("/subscribe/:id", NotificationController.subscribe);
//Send a notification to the user
router.post("/send/:id", NotificationController.sendNotification);
export default router;
