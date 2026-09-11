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
router.post("/", authMiddleware, createStudent);
router.get("/", authMiddleware, getStudents);
router.get("/:id", authMiddleware, getStudentById);
router.put("/:id", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);


module.exports = router;