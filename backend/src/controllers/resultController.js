const Result = require("../models/Result");

const createResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();

    res.status(201).json(result);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Result ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create result",
      error: error.message
    });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await Result.find();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch results",
      error: error.message
    });
  }
};

const updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        message: "Result not found"
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update result",
      error: error.message
    });
  }
};

const deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: "Result not found"
      });
    }

    res.status(200).json({
      message: "Result deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete result",
      error: error.message
    });
  }
};

module.exports = {
  createResult,
  getResults,
  updateResult,
  deleteResult
};