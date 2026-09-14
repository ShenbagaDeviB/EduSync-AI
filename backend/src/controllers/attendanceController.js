const Attendance = require("../models/Attendance");

const createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create attendance",
      error: error.message
    });
  }
};

const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message
    });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found"
      });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update attendance",
      error: error.message
    });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found"
      });
    }

    res.status(200).json({
      message: "Attendance deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message
    });
  }
};

module.exports = {
  createAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance
};