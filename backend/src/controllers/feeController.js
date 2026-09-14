const Fee = require("../models/Fee");

const createFee = async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();

    res.status(201).json(fee);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Fee ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create fee",
      error: error.message
    });
  }
};

const getFees = async (req, res) => {
  try {
    const fees = await Fee.find();

    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch fees",
      error: error.message
    });
  }
};

const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!fee) {
      return res.status(404).json({
        message: "Fee not found"
      });
    }

    res.status(200).json(fee);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update fee",
      error: error.message
    });
  }
};

const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);

    if (!fee) {
      return res.status(404).json({
        message: "Fee not found"
      });
    }

    res.status(200).json({
      message: "Fee deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete fee",
      error: error.message
    });
  }
};

module.exports = {
  createFee,
  getFees,
  updateFee,
  deleteFee
};