const Announcement = require("../models/Announcement");

const createAnnouncement = async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();

    res.status(201).json(announcement);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Announcement ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create announcement",
      error: error.message
    });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch announcements",
      error: error.message
    });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found"
      });
    }

    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update announcement",
      error: error.message
    });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(
      req.params.id
    );

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found"
      });
    }

    res.status(200).json({
      message: "Announcement deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete announcement",
      error: error.message
    });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement
};