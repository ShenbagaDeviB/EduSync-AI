const express = require("express");

const {
  createExam,
  getExams,
  updateExam,
  deleteExam
} = require("../controllers/examController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  createExam
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty", "student"]),
  getExams
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  updateExam
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteExam
);

module.exports = router;