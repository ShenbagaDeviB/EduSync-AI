const express = require("express");

const {
  createHostelAllocation,
  getHostelAllocations,
  updateHostelAllocation,
  deleteHostelAllocation
} = require("../controllers/hostelAllocationController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createHostelAllocation
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  getHostelAllocations
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateHostelAllocation
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteHostelAllocation
);

module.exports = router;