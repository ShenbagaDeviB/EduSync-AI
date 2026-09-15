const express = require("express");

const {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createNotification
);

router.get(
  "/",
  authMiddleware,
  getNotifications
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateNotification
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteNotification
);

module.exports = router;