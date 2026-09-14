const Leave = require("../models/Leave");

const createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();

    res.status(201).json(leave);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Leave ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create leave",
      error: error.message
    });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leaves",
      error: error.message
    });
  }
};

const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        message: "Leave not found"
      });
    }

    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update leave",
      error: error.message
    });
  }
};

const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);

    if (!leave) {
      return res.status(404).json({
        message: "Leave not found"
      });
    }

    res.status(200).json({
      message: "Leave deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete leave",
      error: error.message
    });
  }
};

module.exports = {
  createLeave,
  getLeaves,
  updateLeave,
  deleteLeave
};