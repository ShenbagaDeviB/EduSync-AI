const Enrollment = require("../models/Enrollment");

const createEnrollment = async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();

    res.status(201).json(enrollment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Enrollment ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create enrollment",
      error: error.message
    });
  }
};

const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find();

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch enrollments",
      error: error.message
    });
  }
};

const updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found"
      });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update enrollment",
      error: error.message
    });
  }
};

const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found"
      });
    }

    res.status(200).json({
      message: "Enrollment deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete enrollment",
      error: error.message
    });
  }
};

module.exports = {
  createEnrollment,
  getEnrollments,
  updateEnrollment,
  deleteEnrollment
};