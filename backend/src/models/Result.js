const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  resultId: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true
  },
  examId: {
    type: String,
    required: true
  },
  marksObtained: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Result", resultSchema);