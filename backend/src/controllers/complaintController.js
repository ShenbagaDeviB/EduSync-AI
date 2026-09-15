const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();

    res.status(201).json(complaint);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Complaint ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create complaint",
      error: error.message
    });
  }
};

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch complaints",
      error: error.message
    });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update complaint",
      error: error.message
    });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    res.status(200).json({
      message: "Complaint deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete complaint",
      error: error.message
    });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint
};