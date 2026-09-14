const express = require("express");

const {
  createEnrollment,
  getEnrollments,
  updateEnrollment,
  deleteEnrollment
} = require("../controllers/enrollmentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  createEnrollment
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty", "student"]),
  getEnrollments
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  updateEnrollment
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteEnrollment
);

module.exports = router;