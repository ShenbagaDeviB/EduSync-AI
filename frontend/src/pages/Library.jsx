import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  bookId: "",
  title: "",
  author: "",
  isbn: "",
  category: "",
  totalCopies: "",
  availableCopies: "",
};

const Library = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/library-books");
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingBook(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        totalCopies: Number(formData.totalCopies),
        availableCopies: Number(formData.availableCopies),
      };

      if (editingBook) {
        await api.put(
          `/library-books/${editingBook._id}`,
          data
        );

        alert("Book updated successfully");
      } else {
        await api.post("/library-books", data);
        alert("Book added successfully");
      }

      resetForm();
      fetchBooks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save book"
      );
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);

    setFormData({
      bookId: book.bookId,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this book?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/library-books/${id}`);

      alert("Book deleted successfully");

      fetchBooks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete book"
      );
    }
  };

  return (
    <main className="dashboard library-page">
      <div className="library-container">

        <div className="library-header">
          <div>
            <h2>Library Books</h2>
            <p>
              Manage books, authors, categories, and
              available library copies.
            </p>
          </div>

          <div className="library-count">
            <strong>{books.length}</strong>
            <span>Total Books</span>
          </div>
        </div>

        <div className="library-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingBook
                  ? "Edit Book"
                  : "Add Book"}
              </h3>

              <p>
                {editingBook
                  ? "Update the book details below."
                  : "Enter the details to add a new library book."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="library-form-grid">

              <div className="form-group">
                <label htmlFor="bookId">
                  Book ID
                </label>

                <input
                  id="bookId"
                  name="bookId"
                  placeholder="Enter book ID"
                  value={formData.bookId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">
                  Title
                </label>

                <input
                  id="title"
                  name="title"
                  placeholder="Enter book title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">
                  Author
                </label>

                <input
                  id="author"
                  name="author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="isbn">
                  ISBN
                </label>

                <input
                  id="isbn"
                  name="isbn"
                  placeholder="Enter ISBN"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  Category
                </label>

                <input
                  id="category"
                  name="category"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="totalCopies">
                  Total Copies
                </label>

                <input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min="0"
                  placeholder="Enter total copies"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="availableCopies">
                  Available Copies
                </label>

                <input
                  id="availableCopies"
                  name="availableCopies"
                  type="number"
                  min="0"
                  placeholder="Enter available copies"
                  value={formData.availableCopies}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="library-form-actions">

              {editingBook && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="primary-button"
              >
                {editingBook
                  ? "Update Book"
                  : "Add Book"}
              </button>

            </div>

          </form>
        </div>

        <div className="library-records-card">

          <div className="section-header">
            <div>
              <h3>Library Book Records</h3>
              <p>
                View and manage all books in the library.
              </p>
            </div>
          </div>

          {books.length === 0 ? (
            <div className="library-empty-state">
              <h4>No books found</h4>
              <p>
                Add your first library book using the form above.
              </p>
            </div>
          ) : (
            <div className="library-table-wrapper">

              <table className="library-table">

                <thead>
                  <tr>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Category</th>
                    <th>Total Copies</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {books.map((book) => (
                    <tr key={book._id}>

                      <td className="book-id">
                        {book.bookId}
                      </td>

                      <td className="book-title">
                        {book.title}
                      </td>

                      <td>{book.author}</td>

                      <td className="book-isbn">
                        {book.isbn}
                      </td>

                      <td>
                        <span className="book-category-badge">
                          {book.category}
                        </span>
                      </td>

                      <td>
                        <span className="book-total-badge">
                          {book.totalCopies}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`book-availability-badge ${
                            book.availableCopies > 0
                              ? "book-available"
                              : "book-unavailable"
                          }`}
                        >
                          {book.availableCopies}
                        </span>
                      </td>

                      <td>
                        <div className="book-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(book)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(book._id)
                            }
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </main>
  );
};

export default Library;