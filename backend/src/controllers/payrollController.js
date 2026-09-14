const Payroll = require("../models/Payroll");

const createPayroll = async (req, res) => {
  try {
    const payroll = new Payroll(req.body);
    await payroll.save();

    res.status(201).json(payroll);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Payroll ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create payroll",
      error: error.message
    });
  }
};

const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find();

    res.status(200).json(payrolls);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payrolls",
      error: error.message
    });
  }
};

const updatePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!payroll) {
      return res.status(404).json({
        message: "Payroll not found"
      });
    }

    res.status(200).json(payroll);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update payroll",
      error: error.message
    });
  }
};

const deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id);

    if (!payroll) {
      return res.status(404).json({
        message: "Payroll not found"
      });
    }

    res.status(200).json({
      message: "Payroll deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete payroll",
      error: error.message
    });
  }
};

module.exports = {
  createPayroll,
  getPayrolls,
  updatePayroll,
  deletePayroll
};