const express = require("express");

const {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback
} = require("../controllers/feedbackController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createFeedback
);

router.get(
  "/",
  authMiddleware,
  getFeedback
);

router.put(
  "/:id",
  authMiddleware,
  updateFeedback
);

router.delete(
  "/:id",
  authMiddleware,
  deleteFeedback
);

module.exports = router;