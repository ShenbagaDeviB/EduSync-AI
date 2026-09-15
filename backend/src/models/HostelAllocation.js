const mongoose = require("mongoose");

const hostelAllocationSchema = new mongoose.Schema({
  allocationId: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true
  },
  hostelId: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  allocationDate: {
    type: Date,
    required: true
  },
  vacateDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ["Active", "Vacated"],
    required: true
  }
});

module.exports = mongoose.model("HostelAllocation", hostelAllocationSchema);