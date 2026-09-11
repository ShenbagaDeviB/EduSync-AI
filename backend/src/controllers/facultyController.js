const Faculty = require("../models/Faculty");

const createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();

    res.status(201).json(faculty);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Faculty ID or email already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create faculty",
      error: error.message
    });
  }
};

const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();

    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch faculties",
      error: error.message
    });
  }
};
const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found"
      });
    }

    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update faculty",
      error: error.message
    });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found"
      });
    }

    res.status(200).json({
      message: "Faculty deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete faculty",
      error: error.message
    });
  }
};

module.exports = {
  createFaculty,
  getFaculties,
  updateFaculty,
  deleteFaculty
};