import { useEffect, useState } from "react";
import api from "../api/api";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [editingAttendance, setEditingAttendance] = useState(null);

  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    date: "",
    status: "Present",
  });

  const fetchAttendance = async () => {
    try {
      const response = await api.get("/attendance");
      setAttendance(response.data);
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      studentId: "",
      subjectId: "",
      date: "",
      status: "Present",
    });

    setEditingAttendance(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAttendance) {
        await api.put(
          `/attendance/${editingAttendance._id}`,
          formData
        );

        alert("Attendance updated successfully");
      } else {
        await api.post("/attendance", formData);

        alert("Attendance added successfully");
      }

      resetForm();
      fetchAttendance();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save attendance"
      );
    }
  };

  const handleEdit = (record) => {
    setEditingAttendance(record);

    setFormData({
      studentId: record.studentId,
      subjectId: record.subjectId,
      date: record.date.split("T")[0],
      status: record.status,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this attendance record?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/attendance/${id}`);

      alert("Attendance deleted successfully");

      fetchAttendance();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete attendance"
      );
    }
  };

  return (
    <main className="dashboard attendance-page">
      <div className="attendance-container">

        {/* Header */}
        <div className="attendance-header">
          <div>
            <h2>Attendance</h2>
            <p>
              Record and manage student attendance.
            </p>
          </div>

          <div className="attendance-count">
            <strong>{attendance.length}</strong>
            <span>Total Records</span>
          </div>
        </div>

        {/* Form */}
        <div className="attendance-form-card">
          <div className="section-header">
            <div>
              <h3>
                {editingAttendance
                  ? "Edit Attendance"
                  : "Record Attendance"}
              </h3>

              <p>
                {editingAttendance
                  ? "Update the attendance details below."
                  : "Enter the attendance details for a student."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="attendance-form-grid">

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
                <label htmlFor="subjectId">
                  Subject ID
                </label>

                <input
                  id="subjectId"
                  name="subjectId"
                  placeholder="Enter subject ID"
                  value={formData.subjectId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">
                  Date
                </label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
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
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

            </div>

            <div className="attendance-form-actions">
              {editingAttendance && (
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
                {editingAttendance
                  ? "Update Attendance"
                  : "Add Attendance"}
              </button>
            </div>
          </form>
        </div>

        {/* Records */}
        <div className="attendance-records-card">

          <div className="section-header">
            <div>
              <h3>Attendance Records</h3>
              <p>
                View and manage attendance records.
              </p>
            </div>
          </div>

          {attendance.length === 0 ? (
            <div className="attendance-empty-state">
              <h4>No attendance records found</h4>
              <p>
                Add an attendance record using the form above.
              </p>
            </div>
          ) : (
            <div className="attendance-table-wrapper">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Subject ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((record) => (
                    <tr key={record._id}>

                      <td className="attendance-student">
                        {record.studentId}
                      </td>

                      <td>
                        {record.subjectId}
                      </td>

                      <td>
                        {record.date
                          ? record.date.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <span
                          className={`attendance-status-badge ${
                            record.status === "Present"
                              ? "attendance-present"
                              : "attendance-absent"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>

                      <td>
                        <div className="attendance-actions">
                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(record)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(record._id)
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

export default Attendance;