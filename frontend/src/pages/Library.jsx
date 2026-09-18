import { useEffect, useState } from "react";
import api from "../api/api";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    author: "",
    isbn: "",
    category: "",
    totalCopies: "",
    availableCopies: ""
  });

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
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        totalCopies: Number(formData.totalCopies),
        availableCopies: Number(formData.availableCopies)
      };

      if (editingBook) {
        await api.put(`/library-books/${editingBook._id}`, data);
        alert("Book updated successfully");
        setEditingBook(null);
      } else {
        await api.post("/library-books", data);
        alert("Book added successfully");
      }

      setFormData({
        bookId: "",
        title: "",
        author: "",
        isbn: "",
        category: "",
        totalCopies: "",
        availableCopies: ""
      });

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
      availableCopies: book.availableCopies
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
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
    <main className="dashboard">
      <h2>Library Books</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="bookId"
          placeholder="Book ID"
          value={formData.bookId}
          onChange={handleChange}
          required
        />

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <input
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          name="totalCopies"
          type="number"
          placeholder="Total Copies"
          value={formData.totalCopies}
          onChange={handleChange}
          required
        />

        <input
          name="availableCopies"
          type="number"
          placeholder="Available Copies"
          value={formData.availableCopies}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingBook ? "Update Book" : "Add Book"}
        </button>
      </form>

      <hr />

      <h3>Library Book Records</h3>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Total Copies</th>
              <th>Available Copies</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.bookId}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.category}</td>
                <td>{book.totalCopies}</td>
                <td>{book.availableCopies}</td>

                <td>
                  <button onClick={() => handleEdit(book)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(book._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default Library;