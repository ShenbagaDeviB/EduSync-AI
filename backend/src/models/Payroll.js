const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  payrollId: {
    type: String,
    required: true,
    unique: true
  },
  facultyId: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  basicSalary: {
    type: Number,
    required: true
  },
  allowances: {
    type: Number,
    default: 0
  },
  deductions: {
    type: Number,
    default: 0
  },
  netSalary: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    required: true
  },
  paymentDate: {
    type: Date
  }
});

module.exports = mongoose.model("Payroll", payrollSchema);