const express = require("express");

const {
  createHostelRoom,
  getHostelRooms,
  updateHostelRoom,
  deleteHostelRoom
} = require("../controllers/hostelRoomController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createHostelRoom
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  getHostelRooms
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateHostelRoom
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteHostelRoom
);

module.exports = router;