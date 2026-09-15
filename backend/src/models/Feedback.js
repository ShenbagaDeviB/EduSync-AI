const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedbackId: {
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
      "Other"
    ],
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Resolved"],
    default: "Pending"
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", feedbackSchema);