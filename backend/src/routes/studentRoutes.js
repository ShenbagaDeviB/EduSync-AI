const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");
const router = express.Router();
router.post("/", authMiddleware, roleMiddleware(["admin", "faculty"]), createStudent);
router.get("/", authMiddleware, getStudents);
router.get("/:id", authMiddleware, getStudentById);
router.put("/:id", authMiddleware, roleMiddleware(["admin", "faculty"]), updateStudent);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteStudent);


module.exports = router;