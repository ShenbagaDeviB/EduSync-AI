const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { processCommand } = require("../controllers/aiController");

const router = express.Router();

router.post("/", authMiddleware, processCommand);

module.exports = router;