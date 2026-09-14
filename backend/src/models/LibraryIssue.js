const mongoose = require("mongoose");

const libraryIssueSchema = new mongoose.Schema({
  issueId: {
    type: String,
    required: true,
    unique: true
  },
  bookId: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ["Issued", "Returned", "Overdue"],
    required: true
  }
});

module.exports = mongoose.model("LibraryIssue", libraryIssueSchema);