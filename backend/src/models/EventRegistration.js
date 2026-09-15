const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema({
  registrationId: {
    type: String,
    required: true,
    unique: true
  },
  eventId: {
    type: String,
    required: true
  },
  participantId: {
    type: String,
    required: true
  },
  participantType: {
    type: String,
    enum: ["Student", "Faculty", "Staff"],
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Registered", "Attended", "Cancelled"],
    default: "Registered"
  }
});

module.exports = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);