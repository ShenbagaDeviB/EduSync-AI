const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  enrollmentId: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  departmentId: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  enrollmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Active", "Completed", "Dropped"],
    required: true
  }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);