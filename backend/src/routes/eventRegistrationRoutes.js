const express = require("express");

const {
  createEventRegistration,
  getEventRegistrations,
  updateEventRegistration,
  deleteEventRegistration
} = require("../controllers/eventRegistrationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createEventRegistration
);

router.get(
  "/",
  authMiddleware,
  getEventRegistrations
);

router.put(
  "/:id",
  authMiddleware,
  updateEventRegistration
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEventRegistration
);

module.exports = router;