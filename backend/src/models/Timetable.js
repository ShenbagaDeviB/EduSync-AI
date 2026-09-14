const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  timetableId: {
    type: String,
    required: true,
    unique: true
  },
  courseId: {
    type: String,
    required: true
  },
  subjectId: {
    type: String,
    required: true
  },
  facultyId: {
    type: String,
    required: true
  },
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Timetable", timetableSchema);