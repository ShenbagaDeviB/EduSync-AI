import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  issueId: "",
  bookId: "",
  studentId: "",
  issueDate: "",
  dueDate: "",
  returnDate: "",
  status: "Issued",
};

const LibraryIssues = () => {
  const [issues, setIssues] = useState([]);
  const [editingIssue, setEditingIssue] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchIssues = async () => {
    try {
      const response = await api.get("/library-issues");
      setIssues(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch library issues:",
        error
      );
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingIssue(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        returnDate: formData.returnDate || undefined,
      };

      if (editingIssue) {
        await api.put(
          `/library-issues/${editingIssue._id}`,
          data
        );

        alert("Library issue updated successfully");
      } else {
        await api.post("/library-issues", data);
        alert("Library issue added successfully");
      }

      resetForm();
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
      issueDate: issue.issueDate
        ? issue.issueDate.split("T")[0]
        : "",
      dueDate: issue.dueDate
        ? issue.dueDate.split("T")[0]
        : "",
      returnDate: issue.returnDate
        ? issue.returnDate.split("T")[0]
        : "",
      status: issue.status,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this issue?"
      )
    ) {
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
    <main className="dashboard library-issues-page">
      <div className="library-issues-container">

        <div className="library-issues-header">
          <div>
            <h2>Library Issues</h2>
            <p>
              Manage book issues, due dates, returns,
              and overdue records.
            </p>
          </div>

          <div className="library-issues-count">
            <strong>{issues.length}</strong>
            <span>Total Issues</span>
          </div>
        </div>

        <div className="library-issue-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingIssue
                  ? "Edit Library Issue"
                  : "Add Library Issue"}
              </h3>

              <p>
                {editingIssue
                  ? "Update the issue details below."
                  : "Enter the details to create a new issue record."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="library-issue-form-grid">

              <div className="form-group">
                <label htmlFor="issueId">
                  Issue ID
                </label>

                <input
                  id="issueId"
                  name="issueId"
                  placeholder="Enter issue ID"
                  value={formData.issueId}
                  onChange={handleChange}
                  required
                />
              </div>

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
                <label htmlFor="studentId">
                  Student ID
                </label>

                <input
                  id="studentId"
                  name="studentId"
                  placeholder="Enter student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Issued">
                    Issued
                  </option>

                  <option value="Returned">
                    Returned
                  </option>

                  <option value="Overdue">
                    Overdue
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="issueDate">
                  Issue Date
                </label>

                <input
                  id="issueDate"
                  name="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">
                  Due Date
                </label>

                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="returnDate">
                  Return Date
                </label>

                <input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="library-issue-form-actions">

              {editingIssue && (
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
                {editingIssue
                  ? "Update Issue"
                  : "Add Issue"}
              </button>

            </div>

          </form>
        </div>

        <div className="library-issue-records-card">

          <div className="section-header">
            <div>
              <h3>Library Issue Records</h3>
              <p>
                View and manage all library issue records.
              </p>
            </div>
          </div>

          {issues.length === 0 ? (
            <div className="library-issue-empty-state">
              <h4>No library issues found</h4>
              <p>
                Add your first library issue using the form above.
              </p>
            </div>
          ) : (
            <div className="library-issue-table-wrapper">

              <table className="library-issue-table">

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

                      <td className="issue-id">
                        {issue.issueId}
                      </td>

                      <td className="issue-book-id">
                        {issue.bookId}
                      </td>

                      <td className="issue-student-id">
                        {issue.studentId}
                      </td>

                      <td>
                        {issue.issueDate
                          ? issue.issueDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        {issue.dueDate
                          ? issue.dueDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        {issue.returnDate
                          ? issue.returnDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <span
                          className={`library-issue-status-badge issue-${issue.status?.toLowerCase()}`}
                        >
                          {issue.status}
                        </span>
                      </td>

                      <td>
                        <div className="library-issue-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(issue)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(issue._id)
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

export default LibraryIssues;