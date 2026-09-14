const express = require("express");

const {
  createLibraryIssue,
  getLibraryIssues,
  updateLibraryIssue,
  deleteLibraryIssue
} = require("../controllers/libraryIssueController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  createLibraryIssue
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty", "student"]),
  getLibraryIssues
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  updateLibraryIssue
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteLibraryIssue
);

module.exports = router;