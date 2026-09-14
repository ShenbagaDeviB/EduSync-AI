const Hostel = require("../models/Hostel");

const createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    await hostel.save();

    res.status(201).json(hostel);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Hostel ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create hostel",
      error: error.message
    });
  }
};

const getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();

    res.status(200).json(hostels);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch hostels",
      error: error.message
    });
  }
};

const updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!hostel) {
      return res.status(404).json({
        message: "Hostel not found"
      });
    }

    res.status(200).json(hostel);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update hostel",
      error: error.message
    });
  }
};

const deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndDelete(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        message: "Hostel not found"
      });
    }

    res.status(200).json({
      message: "Hostel deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete hostel",
      error: error.message
    });
  }
};

module.exports = {
  createHostel,
  getHostels,
  updateHostel,
  deleteHostel
};