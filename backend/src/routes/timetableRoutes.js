const express = require("express");

const {
  createTimetable,
  getTimetables,
  updateTimetable,
  deleteTimetable
} = require("../controllers/timetableController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  createTimetable
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty", "student"]),
  getTimetables
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  updateTimetable
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteTimetable
);

module.exports = router;