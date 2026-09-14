const express = require("express");

const {
  createLeave,
  getLeaves,
  updateLeave,
  deleteLeave
} = require("../controllers/leaveController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  createLeave
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  getLeaves
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  updateLeave
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteLeave
);

module.exports = router;