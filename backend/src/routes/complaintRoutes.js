const express = require("express");

const {
  createComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createComplaint
);

router.get(
  "/",
  authMiddleware,
  getComplaints
);

router.put(
  "/:id",
  authMiddleware,
  updateComplaint
);

router.delete(
  "/:id",
  authMiddleware,
  deleteComplaint
);

module.exports = router;