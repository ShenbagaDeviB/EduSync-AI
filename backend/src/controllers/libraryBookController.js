const LibraryBook = require("../models/LibraryBook");

const createLibraryBook = async (req, res) => {
  try {
    const book = new LibraryBook(req.body);
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Book ID or ISBN already exists"
      });
    }

    res.status(500).json({
      message: "Failed to create library book",
      error: error.message
    });
  }
};

const getLibraryBooks = async (req, res) => {
  try {
    const books = await LibraryBook.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch library books",
      error: error.message
    });
  }
};

const updateLibraryBook = async (req, res) => {
  try {
    const book = await LibraryBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({
        message: "Library book not found"
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update library book",
      error: error.message
    });
  }
};

const deleteLibraryBook = async (req, res) => {
  try {
    const book = await LibraryBook.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Library book not found"
      });
    }

    res.status(200).json({
      message: "Library book deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete library book",
      error: error.message
    });
  }
};

module.exports = {
  createLibraryBook,
  getLibraryBooks,
  updateLibraryBook,
  deleteLibraryBook
};