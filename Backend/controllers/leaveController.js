import Leave from "../models/Leave.js";
import AuditLog from "../models/AuditLog.js";
import User from "../models/User.js";

// Create leave (Employee)
export const createLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    if (!startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({ message: "Start date must be today or a future date" });
    }

    if (end < start) {
      return res.status(400).json({ message: "End date cannot be before start date" });
    }

    const diffTime = end - start;
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const leave = await Leave.create({
      employeeId: req.user._id,
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
    res.status(500).json({ message: error.message });
  }
};

// Get my leaves (Employee)
export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user._id }).sort({ createdAt: -1 });

    if (leaves.length === 0) {
      return res.status(404).json({ message: "No leaves found" });
    }

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update leave (Employee)
export const updateMyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    if (!startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    //Only owner can update
    if (leave.employeeId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this leave" });
    }

    // Approved / Rejected leaves cannot be updated
    if (leave.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending leave requests can be updated",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({
        message: "End date cannot be before start date",
      });
    }

    const diffTime = end - start;
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    //  Update allowed fields only
    leave.startDate = start;
    leave.endDate = end;
    leave.reason = reason;
    leave.totalDays = totalDays;

    await leave.save();

    res.json({
      message: "Leave updated successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leaves (Admin)
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update leave status (Admin)
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;
    leave.approvedBy = req.user._id;
    leave.approvedByName = req.user.name;

    await leave.save();

    // Fetch employee info
    const employee = await User.findById(leave.employeeId);

    // Create audit log automatically
    await AuditLog.create({
      leaveId: leave._id,
      action: status,
      adminId: req.user._id,
      adminName: req.user.name,
      employeeId: leave.employeeId,
      employeeName: employee ? employee.name : "Unknown",
    });

    res.json({
      message: "Leave status updated and audit log created successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete leave (Employee)
export const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // Only the requesting employee can delete
    if (leave.employeeId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this leave" });
    }

    // Only pending leaves can be deleted
    if (leave.status !== "Pending") {
      return res.status(400).json({ message: "Only pending leave requests can be deleted" });
    }

    await Leave.findByIdAndDelete(req.params.id);

    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all audit logs (Admin only)
export const getAuditLogs = async (req, res) => {
  try {
    // Only admins can reach here via middleware
    const logs = await AuditLog.find()
      .sort({ createdAt: -1 }) // latest first
      .populate("leaveId", "startDate endDate reason totalDays status") // optional, get leave info
      .populate("adminId", "name email") // optional, get admin info
      .populate("employeeId", "name email"); // optional, get employee info

    res.json({ message: "Audit logs fetched successfully", logs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
