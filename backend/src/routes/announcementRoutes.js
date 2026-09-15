const express = require("express");

const {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcementController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createAnnouncement
);

router.get(
  "/",
  authMiddleware,
  getAnnouncements
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateAnnouncement
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteAnnouncement
);

module.exports = router;