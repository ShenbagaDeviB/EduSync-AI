const Timetable = require("../models/Timetable");

const createTimetable = async (req, res) => {
  try {
    const timetable = new Timetable(req.body);
    await timetable.save();

    res.status(201).json(timetable);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Timetable ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create timetable",
      error: error.message
    });
  }
};

const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find();

    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch timetables",
      error: error.message
    });
  }
};

const updateTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!timetable) {
      return res.status(404).json({
        message: "Timetable not found"
      });
    }

    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update timetable",
      error: error.message
    });
  }
};

const deleteTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);

    if (!timetable) {
      return res.status(404).json({
        message: "Timetable not found"
      });
    }

    res.status(200).json({
      message: "Timetable deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete timetable",
      error: error.message
    });
  }
};

module.exports = {
  createTimetable,
  getTimetables,
  updateTimetable,
  deleteTimetable
};