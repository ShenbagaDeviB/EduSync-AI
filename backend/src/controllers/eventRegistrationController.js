const EventRegistration = require("../models/EventRegistration");

const createEventRegistration = async (req, res) => {
  try {
    const registration = new EventRegistration(req.body);
    await registration.save();

    res.status(201).json(registration);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Registration ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create event registration",
      error: error.message
    });
  }
};

const getEventRegistrations = async (req, res) => {
  try {
    const registrations = await EventRegistration.find();

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch event registrations",
      error: error.message
    });
  }
};

const updateEventRegistration = async (req, res) => {
  try {
    const registration =
      await EventRegistration.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!registration) {
      return res.status(404).json({
        message: "Event registration not found"
      });
    }

    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update event registration",
      error: error.message
    });
  }
};

const deleteEventRegistration = async (req, res) => {
  try {
    const registration =
      await EventRegistration.findByIdAndDelete(
        req.params.id
      );

    if (!registration) {
      return res.status(404).json({
        message: "Event registration not found"
      });
    }

    res.status(200).json({
      message: "Event registration deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete event registration",
      error: error.message
    });
  }
};

module.exports = {
  createEventRegistration,
  getEventRegistrations,
  updateEventRegistration,
  deleteEventRegistration
};