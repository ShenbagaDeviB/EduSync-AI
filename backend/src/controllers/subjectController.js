const Subject = require("../models/Subject");

const createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();

    res.status(201).json(subject);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Subject ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create subject",
      error: error.message
    });
  }
};

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch subjects",
      error: error.message
    });
  }
};

const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found"
      });
    }

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update subject",
      error: error.message
    });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found"
      });
    }

    res.status(200).json({
      message: "Subject deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete subject",
      error: error.message
    });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject
};