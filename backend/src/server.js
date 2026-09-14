require("dotenv").config();
const express = require("express");
const payrollRoutes = require("./routes/payrollRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const libraryIssueRoutes = require("./routes/libraryIssueRoutes");
const libraryBookRoutes = require("./routes/libraryBookRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const feeRoutes = require("./routes/feeRoutes");
const resultRoutes = require("./routes/resultRoutes");
const examRoutes = require("./routes/examRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const courseRoutes = require("./routes/courseRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
const app = express();
app.use(express.json());
app.use("/api/students", studentRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/library-books", libraryBookRoutes);
app.use("/api/library-issues", libraryIssueRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/payrolls", payrollRoutes);
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Educational ERP Backend is running");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});