import { useEffect, useState } from "react";
import api from "../api/api";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [editingLeave, setEditingLeave] = useState(null);

  const [formData, setFormData] = useState({
    leaveId: "",
    facultyId: "",
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
    approvedBy: ""
  });

  const fetchLeaves = async () => {
    try {
      const response = await api.get("/leaves");
      setLeaves(response.data);
    } catch (error) {
      console.error("Failed to fetch leaves:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      leaveId: "",
      facultyId: "",
      leaveType: "Casual",
      startDate: "",
      endDate: "",
      reason: "",
      status: "Pending",
      approvedBy: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        approvedBy: formData.approvedBy || undefined
      };

      if (editingLeave) {
        await api.put(
          `/leaves/${editingLeave._id}`,
          data
        );

        alert("Leave updated successfully");
        setEditingLeave(null);
      } else {
        await api.post("/leaves", data);
        alert("Leave added successfully");
      }

      resetForm();
      fetchLeaves();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save leave"
      );
    }
  };

  const handleEdit = (leave) => {
    setEditingLeave(leave);

    setFormData({
      leaveId: leave.leaveId,
      facultyId: leave.facultyId,
      leaveType: leave.leaveType,
      startDate: leave.startDate
        ? leave.startDate.split("T")[0]
        : "",
      endDate: leave.endDate
        ? leave.endDate.split("T")[0]
        : "",
      reason: leave.reason,
      status: leave.status,
      approvedBy: leave.approvedBy || ""
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this leave?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/leaves/${id}`);

      alert("Leave deleted successfully");

      fetchLeaves();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete leave"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Leave Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="leaveId"
          placeholder="Leave ID"
          value={formData.leaveId}
          onChange={handleChange}
          required
        />

        <input
          name="facultyId"
          placeholder="Faculty ID"
          value={formData.facultyId}
          onChange={handleChange}
          required
        />

        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          required
        >
          <option value="Casual">Casual</option>
          <option value="Sick">Sick</option>
          <option value="Earned">Earned</option>
          <option value="Emergency">Emergency</option>
        </select>

        <input
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <input
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          name="approvedBy"
          placeholder="Approved By"
          value={formData.approvedBy}
          onChange={handleChange}
        />

        <button type="submit">
          {editingLeave
            ? "Update Leave"
            : "Add Leave"}
        </button>
      </form>

      <hr />

      <h3>Leave Records</h3>

      {leaves.length === 0 ? (
        <p>No leave records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Leave ID</th>
              <th>Faculty ID</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Approved By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.leaveId}</td>
                <td>{leave.facultyId}</td>
                <td>{leave.leaveType}</td>
                <td>
                  {leave.startDate
                    ? leave.startDate.split("T")[0]
                    : ""}
                </td>
                <td>
                  {leave.endDate
                    ? leave.endDate.split("T")[0]
                    : ""}
                </td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>{leave.approvedBy || "-"}</td>

                <td>
                  <button
                    onClick={() => handleEdit(leave)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(leave._id)}
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

export default Leave;