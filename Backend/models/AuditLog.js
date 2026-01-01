import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    leaveRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
      required: true,
    },
    action: {
      type: String,
      required: true, // Approved / Rejected
    },
    approvedBy: {
      type: String,
      required: true, // Admin name
    },
    requestedBy: {
      type: String,
      required: true, // employeeId or employee name
    },
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
