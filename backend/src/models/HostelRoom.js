const mongoose = require("mongoose");

const hostelRoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  hostelId: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  roomType: {
    type: String,
    enum: ["Single", "Double", "Triple", "Dormitory"],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  occupied: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["Available", "Full", "Maintenance"],
    required: true
  }
});

module.exports = mongoose.model("HostelRoom", hostelRoomSchema);