const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examId: {
    type: String,
    required: true,
    unique: true
  },
  examName: {
    type: String,
    required: true
  },
  subjectId: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  maxMarks: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Exam", examSchema);
