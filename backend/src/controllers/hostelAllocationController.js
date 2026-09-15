const HostelAllocation = require("../models/HostelAllocation");

const createHostelAllocation = async (req, res) => {
  try {
    const allocation = new HostelAllocation(req.body);
    await allocation.save();

    res.status(201).json(allocation);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Allocation ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create hostel allocation",
      error: error.message
    });
  }
};

const getHostelAllocations = async (req, res) => {
  try {
    const allocations = await HostelAllocation.find();

    res.status(200).json(allocations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch hostel allocations",
      error: error.message
    });
  }
};

const updateHostelAllocation = async (req, res) => {
  try {
    const allocation = await HostelAllocation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!allocation) {
      return res.status(404).json({
        message: "Hostel allocation not found"
      });
    }

    res.status(200).json(allocation);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update hostel allocation",
      error: error.message
    });
  }
};

const deleteHostelAllocation = async (req, res) => {
  try {
    const allocation = await HostelAllocation.findByIdAndDelete(
      req.params.id
    );

    if (!allocation) {
      return res.status(404).json({
        message: "Hostel allocation not found"
      });
    }

    res.status(200).json({
      message: "Hostel allocation deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete hostel allocation",
      error: error.message
    });
  }
};

module.exports = {
  createHostelAllocation,
  getHostelAllocations,
  updateHostelAllocation,
  deleteHostelAllocation
};