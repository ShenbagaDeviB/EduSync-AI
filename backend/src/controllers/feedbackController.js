const Feedback = require("../models/Feedback");

const createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    res.status(201).json(feedback);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Feedback ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create feedback",
      error: error.message
    });
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch feedback",
      error: error.message
    });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found"
      });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update feedback",
      error: error.message
    });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(
      req.params.id
    );

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found"
      });
    }

    res.status(200).json({
      message: "Feedback deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete feedback",
      error: error.message
    });
  }
};

module.exports = {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback
};