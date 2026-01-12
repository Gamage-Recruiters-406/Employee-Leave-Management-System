import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    leaveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
      required: true,
    },
    action: {
      type: String,
      enum: ["Approved", "Rejected"],
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
