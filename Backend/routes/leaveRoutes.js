import express from "express";
import {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  deleteLeave
} from "../controllers/leaveController.js";

const router = express.Router();

// Employee
router.post("/", createLeave); //  /leaves
router.get("/my/:employeeId", getMyLeaves); // /leaves/my/:employeeId
router.delete("/:id", deleteLeave); // /leaves/:id

// Admin
router.get("/admin/all", getAllLeaves); //  /leaves/admin/all
router.put("/admin/:id/status", updateLeaveStatus); //  /leaves/admin/:id/status

export default router;
