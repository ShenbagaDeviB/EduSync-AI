const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  hostelId: {
    type: String,
    required: true,
    unique: true
  },
  hostelName: {
    type: String,
    required: true
  },
  hostelType: {
    type: String,
    enum: ["Boys", "Girls"],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  totalRooms: {
    type: Number,
    required: true
  },
  totalCapacity: {
    type: Number,
    required: true
  },
  wardenName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true
  }
});

module.exports = mongoose.model("Hostel", hostelSchema);