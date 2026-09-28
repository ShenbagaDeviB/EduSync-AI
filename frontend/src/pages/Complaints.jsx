import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  complaintId: "",
  submittedBy: "",
  category: "",
  subject: "",
  description: "",
  priority: "Medium",
  status: "Submitted",
  resolution: "",
};

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchComplaints = async () => {
    try {
      const response = await api.get("/complaints");
      setComplaints(response.data);
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/complaints/${editingId}`, form);
        alert("Complaint updated successfully");
      } else {
        await api.post("/complaints", form);
        alert("Complaint created successfully");
      }

      setForm(initialForm);
      setEditingId(null);
      setLoading(true);

      await fetchComplaints();
    } catch (error) {
      console.error("Complaint error:", error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to save complaint"
      );
    }
  };

  const handleEdit = (complaint) => {
    setForm({
      complaintId: complaint.complaintId || "",
      submittedBy: complaint.submittedBy || "",
      category: complaint.category || "",
      subject: complaint.subject || "",
      description: complaint.description || "",
      priority: complaint.priority || "Medium",
      status: complaint.status || "Submitted",
      resolution: complaint.resolution || "",
    });

    setEditingId(complaint._id);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/complaints/${id}`);

      alert("Complaint deleted successfully");

      fetchComplaints();
    } catch (error) {
      console.error("Delete complaint error:", error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete complaint"
      );
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  return (
    <main className="dashboard complaints-page">
      <div className="complaints-container">

        {/* Header */}

        <div className="complaints-header">
          <div>
            <h2>Complaints</h2>
            <p>
              Create, track, and manage institutional complaints.
            </p>
          </div>

          <div className="complaints-count">
            <strong>{complaints.length}</strong>
            <span>Total Complaints</span>
          </div>
        </div>

        {/* Form */}

        <div className="complaint-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingId
                  ? "Edit Complaint"
                  : "Create Complaint"}
              </h3>

              <p>
                {editingId
                  ? "Update the complaint details below."
                  : "Enter the details to create a complaint."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="complaint-form-grid">

              <div className="form-group">
                <label htmlFor="complaintId">
                  Complaint ID
                </label>

                <input
                  id="complaintId"
                  type="text"
                  name="complaintId"
                  placeholder="Enter complaint ID"
                  value={form.complaintId}
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
                  type="text"
                  name="submittedBy"
                  placeholder="Enter submitter"
                  value={form.submittedBy}
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
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Category
                  </option>
                  <option value="Academic">
                    Academic
                  </option>
                  <option value="Faculty">
                    Faculty
                  </option>
                  <option value="Infrastructure">
                    Infrastructure
                  </option>
                  <option value="Hostel">
                    Hostel
                  </option>
                  <option value="Library">
                    Library
                  </option>
                  <option value="Transport">
                    Transport
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Enter complaint subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the complaint"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">
                  Priority
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">
                    Critical
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Submitted">
                    Submitted
                  </option>
                  <option value="Under Review">
                    Under Review
                  </option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Resolved">
                    Resolved
                  </option>
                  <option value="Rejected">
                    Rejected
                  </option>
                </select>
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="resolution">
                  Resolution
                </label>

                <textarea
                  id="resolution"
                  name="resolution"
                  placeholder="Enter resolution if available"
                  value={form.resolution}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

            </div>

            <div className="complaint-form-actions">

              {editingId && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="primary-button"
              >
                {editingId
                  ? "Update Complaint"
                  : "Add Complaint"}
              </button>

            </div>

          </form>
        </div>

        {/* Complaint Records */}

        <div className="complaint-records-card">

          <div className="section-header">
            <div>
              <h3>Complaint Records</h3>
              <p>
                View and manage submitted complaints.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="complaint-empty-state">
              <p>Loading complaints...</p>
            </div>
          ) : complaints.length === 0 ? (
            <div className="complaint-empty-state">
              <h4>No complaints found</h4>
              <p>
                Create your first complaint using the form above.
              </p>
            </div>
          ) : (
            <div className="complaint-table-wrapper">

              <table className="complaint-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Subject</th>
                    <th>Submitted By</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Resolution</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {complaints.map((complaint) => (
                    <tr key={complaint._id}>

                      <td className="complaint-id">
                        {complaint.complaintId}
                      </td>

                      <td className="complaint-subject">
                        {complaint.subject}
                      </td>

                      <td>
                        {complaint.submittedBy}
                      </td>

                      <td>
                        <span className="complaint-category-badge">
                          {complaint.category}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`complaint-priority-badge priority-${complaint.priority
                            ?.toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {complaint.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`complaint-status-badge status-${complaint.status
                            ?.toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          {complaint.status}
                        </span>
                      </td>

                      <td className="complaint-description">
                        {complaint.description}
                      </td>

                      <td className="complaint-resolution">
                        {complaint.resolution ||
                          "Not resolved"}
                      </td>

                      <td>

                        <div className="complaint-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(complaint)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                complaint._id
                              )
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

export default Complaints;