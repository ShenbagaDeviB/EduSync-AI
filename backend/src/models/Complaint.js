const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    required: true,
    unique: true
  },

  submittedBy: {
    type: String,
    required: true
  },

  category: {
    type: String,
    enum: [
      "Academic",
      "Faculty",
      "Infrastructure",
      "Hostel",
      "Library",
      "Transport",
      "Other"
    ],
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium"
  },

  status: {
    type: String,
    enum: [
      "Submitted",
      "Under Review",
      "In Progress",
      "Resolved",
      "Rejected"
    ],
    default: "Submitted"
  },

  resolution: {
    type: String,
    default: ""
  },

  submittedAt: {
    type: Date,
    default: Date.now
  },

  resolvedAt: {
    type: Date
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);