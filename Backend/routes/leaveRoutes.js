import express from "express";
import {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  deleteLeave,
  getAuditLogs
} from "../controllers/leaveController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Employee
router.post("/",verifyToken, createLeave); //  /leaves
router.get("/my",verifyToken, getMyLeaves); // /leaves/my
router.delete("/:id",verifyToken, deleteLeave); // /leaves/:id

// Admin
router.get("/admin/all",verifyToken, verifyAdmin, getAllLeaves); //  /leaves/admin/all
router.put("/admin/:id/status",verifyToken, verifyAdmin, updateLeaveStatus); //  /leaves/admin/:id/status
router.get("/admin/audit-logs", verifyToken, verifyAdmin, getAuditLogs); // leaves/admin/audit-logs

export default router;
