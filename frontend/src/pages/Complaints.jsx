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
  resolution: ""
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
      [e.target.name]: e.target.value
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
      resolution: complaint.resolution || ""
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
    <main className="dashboard">
      <h2>Complaints</h2>

      {/* Complaint Form */}

      <div
        className="dashboard-card"
        style={{
          maxWidth: "800px",
          marginTop: "20px"
        }}
      >
        <h3>
          {editingId ? "Edit Complaint" : "Create Complaint"}
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="complaintId"
            placeholder="Complaint ID"
            value={form.complaintId}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            type="text"
            name="submittedBy"
            placeholder="Submitted By"
            value={form.submittedBy}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Academic">Academic</option>
            <option value="Faculty">Faculty</option>
            <option value="Infrastructure">
              Infrastructure
            </option>
            <option value="Hostel">Hostel</option>
            <option value="Library">Library</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>

          <br />
          <br />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            required
          />

          <br />
          <br />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <br />
          <br />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <br />
          <br />

          <textarea
            name="resolution"
            placeholder="Resolution"
            value={form.resolution}
            onChange={handleChange}
            rows="4"
          />

          <br />
          <br />

          <button type="submit">
            {editingId
              ? "Update Complaint"
              : "Add Complaint"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Complaint List */}

      <div style={{ marginTop: "30px" }}>
        <h3>Complaint List</h3>

        {loading ? (
          <p>Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          complaints.map((complaint) => (
            <div
              className="dashboard-card"
              key={complaint._id}
              style={{
                marginTop: "15px",
                maxWidth: "800px"
              }}
            >
              <h3>{complaint.subject}</h3>

              <p>
                <strong>Complaint ID:</strong>{" "}
                {complaint.complaintId}
              </p>

              <p>
                <strong>Submitted By:</strong>{" "}
                {complaint.submittedBy}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {complaint.category}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {complaint.priority}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {complaint.status}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {complaint.description}
              </p>

              <p>
                <strong>Resolution:</strong>{" "}
                {complaint.resolution || "Not resolved"}
              </p>

              <button
                onClick={() => handleEdit(complaint)}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(complaint._id)
                }
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Complaints;