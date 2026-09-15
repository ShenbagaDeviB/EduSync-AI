const Notification = require("../models/Notification");

const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();

    res.status(201).json(notification);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Notification ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create notification",
      error: error.message
    });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message
    });
  }
};

const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notification",
      error: error.message
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(
      req.params.id
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    res.status(200).json({
      message: "Notification deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete notification",
      error: error.message
    });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification
};