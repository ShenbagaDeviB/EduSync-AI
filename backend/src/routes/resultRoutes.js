const express = require("express");

const {
  createResult,
  getResults,
  updateResult,
  deleteResult
} = require("../controllers/resultController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  createResult
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty", "student"]),
  getResults
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  updateResult
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteResult
);

module.exports = router;