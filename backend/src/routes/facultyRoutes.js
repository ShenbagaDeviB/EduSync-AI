const express = require("express");

const {
  createFaculty,
  getFaculties,
  updateFaculty,
  deleteFaculty
} = require("../controllers/facultyController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createFaculty
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  getFaculties
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateFaculty
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteFaculty
);

module.exports = router;

