require("dotenv").config();
const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
const app = express();
app.use(express.json());
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Educational ERP Backend is running");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});