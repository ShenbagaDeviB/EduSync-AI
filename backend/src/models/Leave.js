const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  leaveId: {
    type: String,
    required: true,
    unique: true
  },
  facultyId: {
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    enum: ["Casual", "Sick", "Earned", "Emergency"],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    required: true
  },
  approvedBy: {
    type: String
  }
});

module.exports = mongoose.model("Leave", leaveSchema);