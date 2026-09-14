const express = require("express");

const {
  createLibraryBook,
  getLibraryBooks,
  updateLibraryBook,
  deleteLibraryBook
} = require("../controllers/libraryBookController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  createLibraryBook
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "faculty", "student"]),
  getLibraryBooks
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "faculty"]),
  updateLibraryBook
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteLibraryBook
);

module.exports = router;