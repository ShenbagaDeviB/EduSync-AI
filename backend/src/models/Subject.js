const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectId: {
    type: String,
    required: true,
    unique: true
  },
  subjectName: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  credits: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Subject", subjectSchema);