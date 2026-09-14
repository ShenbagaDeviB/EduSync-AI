const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  feeId: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Overdue"],
    required: true
  }
});

module.exports = mongoose.model("Fee", feeSchema);