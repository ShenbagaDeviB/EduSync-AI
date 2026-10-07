import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  leaveId: "",
  facultyId: "",
  leaveType: "Casual",
  startDate: "",
  endDate: "",
  reason: "",
  status: "Pending",
  approvedBy: "",
};

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [editingLeave, setEditingLeave] = useState(null);
  const [formData, setFormData] = useState(initialForm);

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
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingLeave(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        approvedBy: formData.approvedBy || undefined,
      };

      if (editingLeave) {
        await api.put(
          `/leaves/${editingLeave._id}`,
          data
        );

        alert("Leave updated successfully");
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
      approvedBy: leave.approvedBy || "",
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
    <main className="dashboard leave-page">
      <div className="leave-container">

        <div className="leave-header">
          <div>
            <h2>Leave Management</h2>
            <p>
              Manage faculty leave requests, approvals,
              and leave records.
            </p>
          </div>

          <div className="leave-count">
            <strong>{leaves.length}</strong>
            <span>Total Leaves</span>
          </div>
        </div>

        <div className="leave-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingLeave
                  ? "Edit Leave"
                  : "Add Leave"}
              </h3>

              <p>
                {editingLeave
                  ? "Update the leave details below."
                  : "Enter the details to create a new leave record."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="leave-form-grid">

              <div className="form-group">
                <label htmlFor="leaveId">
                  Leave ID
                </label>

                <input
                  id="leaveId"
                  name="leaveId"
                  placeholder="Enter leave ID"
                  value={formData.leaveId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="facultyId">
                  Faculty ID
                </label>

                <input
                  id="facultyId"
                  name="facultyId"
                  placeholder="Enter faculty ID"
                  value={formData.facultyId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="leaveType">
                  Leave Type
                </label>

                <select
                  id="leaveType"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  required
                >
                  <option value="Casual">Casual</option>
                  <option value="Sick">Sick</option>
                  <option value="Earned">Earned</option>
                  <option value="Emergency">
                    Emergency
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
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="startDate">
                  Start Date
                </label>

                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">
                  End Date
                </label>

                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="approvedBy">
                  Approved By
                </label>

                <input
                  id="approvedBy"
                  name="approvedBy"
                  placeholder="Enter approver name or ID"
                  value={formData.approvedBy}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group leave-reason-group">
                <label htmlFor="reason">
                  Reason
                </label>

                <textarea
                  id="reason"
                  name="reason"
                  placeholder="Enter reason for leave"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="leave-form-actions">

              {editingLeave && (
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
                {editingLeave
                  ? "Update Leave"
                  : "Add Leave"}
              </button>

            </div>

          </form>
        </div>

        <div className="leave-records-card">

          <div className="section-header">
            <div>
              <h3>Leave Records</h3>
              <p>
                View and manage all faculty leave requests.
              </p>
            </div>
          </div>

          {leaves.length === 0 ? (
            <div className="leave-empty-state">
              <h4>No leave records found</h4>
              <p>
                Add your first leave record using the form above.
              </p>
            </div>
          ) : (
            <div className="leave-table-wrapper">

              <table className="leave-table">

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

                      <td className="leave-id">
                        {leave.leaveId}
                      </td>

                      <td className="leave-faculty-id">
                        {leave.facultyId}
                      </td>

                      <td>
                        <span className="leave-type-badge">
                          {leave.leaveType}
                        </span>
                      </td>

                      <td>
                        {leave.startDate
                          ? leave.startDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        {leave.endDate
                          ? leave.endDate.split("T")[0]
                          : "-"}
                      </td>

                      <td className="leave-reason">
                        {leave.reason}
                      </td>

                      <td>
                        <span
                          className={`leave-status-badge leave-${leave.status?.toLowerCase()}`}
                        >
                          {leave.status}
                        </span>
                      </td>

                      <td>
                        {leave.approvedBy || "-"}
                      </td>

                      <td>
                        <div className="leave-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(leave)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(leave._id)
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

export default Leave;