const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  announcementId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  postedBy: {
    type: String,
    required: true
  },
  targetAudience: {
    type: String,
    enum: ["All", "Students", "Faculty", "Staff"],
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "Expired"],
    required: true
  }
});

module.exports = mongoose.model("Announcement", announcementSchema);