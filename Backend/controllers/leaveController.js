import Leave from "../models/Leave.js";
import AuditLog from "../models/AuditLog.js";

//create leave
export const createLeave = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, reason } = req.body;

    if (!employeeId || !startDate || !endDate || !reason) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Normalize today (remove time part)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Start date must not be in the past
    if (start < today) {
      return res.status(400).json({
        message: "Start date must be today or a future date",
      });
    }

    // End date must not be before start date
    if (end < start) {
      return res.status(400).json({
        message: "End date cannot be before start date",
      });
    }

    // Calculate total days (inclusive)
    const diffTime = end - start;
    const totalDays =
      Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const leave = await Leave.create({
      employeeId,
      startDate: start,
      endDate: end,
      reason,
      totalDays,
    });

    res.status(201).json({
      message: "Leave request created successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get a single user leave requests
// GET /leaves/my/:employeeId
export const getMyLeaves = async (req, res) => {
  try {
    const { employeeId } = req.params;

    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const leaves = await Leave.find({ employeeId })
      .sort({ createdAt: -1 });

    if (leaves.length === 0) {
      return res.status(404).json({ message: "No leaves found" });
    }

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all leave requests by admin
// GET /leaves/admin/all
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Leave from "../models/Leave.js";

//update status by admin
// PUT /leaves/admin/:id/status
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status, adminId } = req.body; // manual adminId for now

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Update status
    leave.status = status;

    // Track which admin approved/rejected
    leave.approvedBy = adminId;

    await leave.save();

    res.json({
      message: "Leave status updated",
      leave,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//delete leave request
// DELETE /leaves/:id
export const deleteLeave = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const { employeeId } = req.body; // for now, employeeId is sent manually

    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // Only the requesting employee can delete their own leave
    if (leave.employeeId !== employeeId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this leave" });
    }

    // Only pending leave can be deleted
    if (leave.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Only pending leave requests can be deleted" });
    }

    await Leave.findByIdAndDelete(leaveId);

    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

