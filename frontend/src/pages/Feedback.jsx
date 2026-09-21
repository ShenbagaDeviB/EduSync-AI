import { useEffect, useState } from "react";
import api from "../api/api";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);

  const [formData, setFormData] = useState({
    feedbackId: "",
    submittedBy: "",
    category: "Academic",
    subject: "",
    message: "",
    rating: "",
    status: "Pending"
  });

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
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      feedbackId: "",
      submittedBy: "",
      category: "Academic",
      subject: "",
      message: "",
      rating: "",
      status: "Pending"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        rating: formData.rating
          ? Number(formData.rating)
          : undefined
      };

      if (editingFeedback) {
        await api.put(
          `/feedback/${editingFeedback._id}`,
          data
        );

        alert("Feedback updated successfully");
        setEditingFeedback(null);
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
      status: feedback.status
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
    <main className="dashboard">
      <h2>Feedback Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="feedbackId"
          placeholder="Feedback ID"
          value={formData.feedbackId}
          onChange={handleChange}
          required
        />

        <input
          name="submittedBy"
          placeholder="Submitted By"
          value={formData.submittedBy}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Academic">Academic</option>
          <option value="Faculty">Faculty</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Hostel">Hostel</option>
          <option value="Library">Library</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Resolved">Resolved</option>
        </select>

        <button type="submit">
          {editingFeedback
            ? "Update Feedback"
            : "Add Feedback"}
        </button>
      </form>

      <hr />

      <h3>Feedback Records</h3>

      {feedbacks.length === 0 ? (
        <p>No feedback records found.</p>
      ) : (
        <table>
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
                <td>{feedback.feedbackId}</td>
                <td>{feedback.submittedBy}</td>
                <td>{feedback.category}</td>
                <td>{feedback.subject}</td>
                <td>{feedback.message}</td>
                <td>{feedback.rating || "-"}</td>
                <td>{feedback.status}</td>

                <td>
                  {feedback.submittedAt
                    ? feedback.submittedAt.split("T")[0]
                    : ""}
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleEdit(feedback)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(feedback._id)
                    }
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

export default Feedback;