const express = require("express");

const {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument
} = require("../controllers/documentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  createDocument
);

router.get(
  "/",
  authMiddleware,
  getDocuments
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateDocument
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteDocument
);

module.exports = router;