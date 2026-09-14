const HostelRoom = require("../models/HostelRoom");

const createHostelRoom = async (req, res) => {
  try {
    const room = new HostelRoom(req.body);
    await room.save();

    res.status(201).json(room);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Room ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create hostel room",
      error: error.message
    });
  }
};

const getHostelRooms = async (req, res) => {
  try {
    const rooms = await HostelRoom.find();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch hostel rooms",
      error: error.message
    });
  }
};

const updateHostelRoom = async (req, res) => {
  try {
    const room = await HostelRoom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!room) {
      return res.status(404).json({
        message: "Hostel room not found"
      });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update hostel room",
      error: error.message
    });
  }
};

const deleteHostelRoom = async (req, res) => {
  try {
    const room = await HostelRoom.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Hostel room not found"
      });
    }

    res.status(200).json({
      message: "Hostel room deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete hostel room",
      error: error.message
    });
  }
};

module.exports = {
  createHostelRoom,
  getHostelRooms,
  updateHostelRoom,
  deleteHostelRoom
};