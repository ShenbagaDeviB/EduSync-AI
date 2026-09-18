import { useEffect, useState } from "react";
import api from "../api/api";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [editingAttendance, setEditingAttendance] = useState(null);

  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    date: "",
    status: "Present"
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
      [e.target.name]: e.target.value
    });
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
        setEditingAttendance(null);
      } else {
        await api.post("/attendance", formData);
        alert("Attendance added successfully");
      }

      setFormData({
        studentId: "",
        subjectId: "",
        date: "",
        status: "Present"
      });

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
      status: record.status
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attendance record?")) {
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
    <main className="dashboard">
      <h2>Attendance</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <input
          name="subjectId"
          placeholder="Subject ID"
          value={formData.subjectId}
          onChange={handleChange}
          required
        />

        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit">
          {editingAttendance
            ? "Update Attendance"
            : "Add Attendance"}
        </button>
      </form>

      <hr />

      <h3>Attendance Records</h3>

      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table>
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
                <td>{record.studentId}</td>
                <td>{record.subjectId}</td>
                <td>{record.date.split("T")[0]}</td>
                <td>{record.status}</td>

                <td>
                  <button
                    onClick={() => handleEdit(record)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(record._id)}
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

export default Attendance;