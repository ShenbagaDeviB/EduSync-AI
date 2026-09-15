const Document = require("../models/Document");

const createDocument = async (req, res) => {
  try {
    const document = new Document(req.body);
    await document.save();

    res.status(201).json(document);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Document ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create document",
      error: error.message
    });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch documents",
      error: error.message
    });
  }
};

const updateDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update document",
      error: error.message
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(
      req.params.id
    );

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      });
    }

    res.status(200).json({
      message: "Document deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete document",
      error: error.message
    });
  }
};

module.exports = {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument
};