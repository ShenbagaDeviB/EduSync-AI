import { useEffect, useState } from "react";
import api from "../api/api";

const LibraryIssues = () => {
  const [issues, setIssues] = useState([]);
  const [editingIssue, setEditingIssue] = useState(null);

  const [formData, setFormData] = useState({
    issueId: "",
    bookId: "",
    studentId: "",
    issueDate: "",
    dueDate: "",
    returnDate: "",
    status: "Issued"
  });

  const fetchIssues = async () => {
    try {
      const response = await api.get("/library-issues");
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch library issues:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
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
        returnDate: formData.returnDate || undefined
      };

      if (editingIssue) {
        await api.put(`/library-issues/${editingIssue._id}`, data);
        alert("Library issue updated successfully");
        setEditingIssue(null);
      } else {
        await api.post("/library-issues", data);
        alert("Library issue added successfully");
      }

      setFormData({
        issueId: "",
        bookId: "",
        studentId: "",
        issueDate: "",
        dueDate: "",
        returnDate: "",
        status: "Issued"
      });

      fetchIssues();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save library issue"
      );
    }
  };

  const handleEdit = (issue) => {
    setEditingIssue(issue);

    setFormData({
      issueId: issue.issueId,
      bookId: issue.bookId,
      studentId: issue.studentId,
      issueDate: issue.issueDate.split("T")[0],
      dueDate: issue.dueDate.split("T")[0],
      returnDate: issue.returnDate
        ? issue.returnDate.split("T")[0]
        : "",
      status: issue.status
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) {
      return;
    }

    try {
      await api.delete(`/library-issues/${id}`);

      alert("Library issue deleted successfully");

      fetchIssues();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete library issue"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Library Issues</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="issueId"
          placeholder="Issue ID"
          value={formData.issueId}
          onChange={handleChange}
          required
        />

        <input
          name="bookId"
          placeholder="Book ID"
          value={formData.bookId}
          onChange={handleChange}
          required
        />

        <input
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <input
          name="issueDate"
          type="date"
          value={formData.issueDate}
          onChange={handleChange}
          required
        />

        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <input
          name="returnDate"
          type="date"
          value={formData.returnDate}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Issued">Issued</option>
          <option value="Returned">Returned</option>
          <option value="Overdue">Overdue</option>
        </select>

        <button type="submit">
          {editingIssue
            ? "Update Issue"
            : "Add Issue"}
        </button>
      </form>

      <hr />

      <h3>Library Issue Records</h3>

      {issues.length === 0 ? (
        <p>No library issues found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Book ID</th>
              <th>Student ID</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.issueId}</td>
                <td>{issue.bookId}</td>
                <td>{issue.studentId}</td>
                <td>{issue.issueDate.split("T")[0]}</td>
                <td>{issue.dueDate.split("T")[0]}</td>
                <td>
                  {issue.returnDate
                    ? issue.returnDate.split("T")[0]
                    : "-"}
                </td>
                <td>{issue.status}</td>

                <td>
                  <button
                    onClick={() => handleEdit(issue)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(issue._id)}
                  >
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

export default LibraryIssues;