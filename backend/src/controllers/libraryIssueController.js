const LibraryIssue = require("../models/LibraryIssue");

const createLibraryIssue = async (req, res) => {
  try {
    const issue = new LibraryIssue(req.body);
    await issue.save();

    res.status(201).json(issue);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Issue ID already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create library issue",
      error: error.message
    });
  }
};

const getLibraryIssues = async (req, res) => {
  try {
    const issues = await LibraryIssue.find();

    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch library issues",
      error: error.message
    });
  }
};

const updateLibraryIssue = async (req, res) => {
  try {
    const issue = await LibraryIssue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({
        message: "Library issue not found"
      });
    }

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update library issue",
      error: error.message
    });
  }
};

const deleteLibraryIssue = async (req, res) => {
  try {
    const issue = await LibraryIssue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res.status(404).json({
        message: "Library issue not found"
      });
    }

    res.status(200).json({
      message: "Library issue deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete library issue",
      error: error.message
    });
  }
};

module.exports = {
  createLibraryIssue,
  getLibraryIssues,
  updateLibraryIssue,
  deleteLibraryIssue
};