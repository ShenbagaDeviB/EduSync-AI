const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  documentId: {
    type: String,
    required: true,
    unique: true
  },
  ownerId: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    enum: [
      "ID Proof",
      "Certificate",
      "Marksheet",
      "Resume",
      "Other"
    ],
    required: true
  },
  documentName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Active", "Archived"],
    default: "Active"
  }
});

module.exports = mongoose.model("Document", documentSchema);