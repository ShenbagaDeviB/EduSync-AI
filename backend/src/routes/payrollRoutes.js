const express = require("express");

const {
  createPayroll,
  getPayrolls,
  updatePayroll,
  deletePayroll
} = require("../controllers/payrollController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createPayroll
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  getPayrolls
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updatePayroll
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deletePayroll
);

module.exports = router;