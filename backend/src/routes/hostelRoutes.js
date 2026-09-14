const express = require("express");

const {
  createHostel,
  getHostels,
  updateHostel,
  deleteHostel
} = require("../controllers/hostelController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createHostel
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  getHostels
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateHostel
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteHostel
);

module.exports = router;