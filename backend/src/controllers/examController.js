const Exam = require("../models/Exam");

const createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();

    res.status(201).json(exam);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Exam ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create exam",
      error: error.message
    });
  }
};

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find();

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch exams",
      error: error.message
    });
  }
};

const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found"
      });
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update exam",
      error: error.message
    });
  }
};

const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found"
      });
    }

    res.status(200).json({
      message: "Exam deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete exam",
      error: error.message
    });
  }
};

module.exports = {
  createExam,
  getExams,
  updateExam,
  deleteExam
};