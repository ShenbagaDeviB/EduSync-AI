import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  feedbackId: "",
  submittedBy: "",
  category: "Academic",
  subject: "",
  message: "",
  rating: "",
  status: "Pending",
};

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchFeedbacks = async () => {
    try {
      const response = await api.get("/feedback");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingFeedback(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        rating: formData.rating
          ? Number(formData.rating)
          : undefined,
      };

      if (editingFeedback) {
        await api.put(
          `/feedback/${editingFeedback._id}`,
          data
        );

        alert("Feedback updated successfully");
      } else {
        await api.post("/feedback", data);
        alert("Feedback added successfully");
      }

      resetForm();
      fetchFeedbacks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save feedback"
      );
    }
  };

  const handleEdit = (feedback) => {
    setEditingFeedback(feedback);

    setFormData({
      feedbackId: feedback.feedbackId,
      submittedBy: feedback.submittedBy,
      category: feedback.category,
      subject: feedback.subject,
      message: feedback.message,
      rating: feedback.rating || "",
      status: feedback.status,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this feedback?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/feedback/${id}`);

      alert("Feedback deleted successfully");

      fetchFeedbacks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete feedback"
      );
    }
  };

  return (
    <main className="dashboard feedback-page">
      <div className="feedback-container">

        <div className="feedback-header">
          <div>
            <h2>Feedback Management</h2>
            <p>
              Collect, review, and manage feedback from
              students and staff.
            </p>
          </div>

          <div className="feedback-count">
            <strong>{feedbacks.length}</strong>
            <span>Total Feedback</span>
          </div>
        </div>

        <div className="feedback-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingFeedback
                  ? "Edit Feedback"
                  : "Add Feedback"}
              </h3>

              <p>
                {editingFeedback
                  ? "Update the feedback details below."
                  : "Enter the details to create a new feedback record."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="feedback-form-grid">

              <div className="form-group">
                <label htmlFor="feedbackId">
                  Feedback ID
                </label>

                <input
                  id="feedbackId"
                  name="feedbackId"
                  placeholder="Enter feedback ID"
                  value={formData.feedbackId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="submittedBy">
                  Submitted By
                </label>

                <input
                  id="submittedBy"
                  name="submittedBy"
                  placeholder="Enter submitter name"
                  value={formData.submittedBy}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Academic">Academic</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Infrastructure">
                    Infrastructure
                  </option>
                  <option value="Hostel">Hostel</option>
                  <option value="Library">Library</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  placeholder="Enter feedback subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group feedback-message-group">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter feedback message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">
                  Rating
                </label>

                <input
                  id="rating"
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rating (1-5)"
                  value={formData.rating}
                  onChange={handleChange}
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
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

            </div>

            <div className="feedback-form-actions">

              {editingFeedback && (
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
                {editingFeedback
                  ? "Update Feedback"
                  : "Add Feedback"}
              </button>

            </div>

          </form>
        </div>

        <div className="feedback-records-card">

          <div className="section-header">
            <div>
              <h3>Feedback Records</h3>
              <p>
                View and manage all submitted feedback.
              </p>
            </div>
          </div>

          {feedbacks.length === 0 ? (
            <div className="feedback-empty-state">
              <h4>No feedback records found</h4>
              <p>
                Add your first feedback record using the
                form above.
              </p>
            </div>
          ) : (
            <div className="feedback-table-wrapper">

              <table className="feedback-table">

                <thead>
                  <tr>
                    <th>Feedback ID</th>
                    <th>Submitted By</th>
                    <th>Category</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Submitted At</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback._id}>

                      <td className="feedback-id">
                        {feedback.feedbackId}
                      </td>

                      <td className="feedback-submitter">
                        {feedback.submittedBy}
                      </td>

                      <td>
                        <span className="feedback-category-badge">
                          {feedback.category}
                        </span>
                      </td>

                      <td className="feedback-subject">
                        {feedback.subject}
                      </td>

                      <td className="feedback-message">
                        {feedback.message}
                      </td>

                      <td>
                        {feedback.rating ? (
                          <span className="feedback-rating-badge">
                            ★ {feedback.rating}/5
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td>
                        <span
                          className={`feedback-status-badge feedback-${feedback.status
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {feedback.status}
                        </span>
                      </td>

                      <td>
                        {feedback.submittedAt
                          ? feedback.submittedAt.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <div className="feedback-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(feedback)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(feedback._id)
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

export default Feedback;