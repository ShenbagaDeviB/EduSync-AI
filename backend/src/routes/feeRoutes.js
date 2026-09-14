const express = require("express");

const {
  createFee,
  getFees,
  updateFee,
  deleteFee
} = require("../controllers/feeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createFee
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty", "student"]),
  getFees
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateFee
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteFee
);

module.exports = router;