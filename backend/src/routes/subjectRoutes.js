const express = require("express");

const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject
} = require("../controllers/subjectController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createSubject
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty", "student"]),
  getSubjects
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateSubject
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteSubject
);

module.exports = router;