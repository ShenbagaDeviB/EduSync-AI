import { useEffect, useState } from "react";
import api from "../api/api";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [editingEnrollment, setEditingEnrollment] = useState(null);

  const [formData, setFormData] = useState({
    enrollmentId: "",
    studentId: "",
    courseId: "",
    departmentId: "",
    academicYear: "",
    semester: "",
    enrollmentDate: "",
    status: "Active"
  });

  const fetchEnrollments = async () => {
    try {
      const response = await api.get("/enrollments");
      setEnrollments(response.data);
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    }
  };

  useEffect(() => {
    fetchEnrollments();
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
        semester: Number(formData.semester)
      };

      if (editingEnrollment) {
        await api.put(
          `/enrollments/${editingEnrollment._id}`,
          data
        );

        alert("Enrollment updated successfully");
        setEditingEnrollment(null);
      } else {
        await api.post("/enrollments", data);
        alert("Enrollment added successfully");
      }

      setFormData({
        enrollmentId: "",
        studentId: "",
        courseId: "",
        departmentId: "",
        academicYear: "",
        semester: "",
        enrollmentDate: "",
        status: "Active"
      });

      fetchEnrollments();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save enrollment"
      );
    }
  };

  const handleEdit = (enrollment) => {
    setEditingEnrollment(enrollment);

    setFormData({
      enrollmentId: enrollment.enrollmentId,
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      departmentId: enrollment.departmentId,
      academicYear: enrollment.academicYear,
      semester: enrollment.semester,
      enrollmentDate: enrollment.enrollmentDate
        ? enrollment.enrollmentDate.split("T")[0]
        : "",
      status: enrollment.status
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) {
      return;
    }

    try {
      await api.delete(`/enrollments/${id}`);

      alert("Enrollment deleted successfully");

      fetchEnrollments();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete enrollment"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Enrollments</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="enrollmentId"
          placeholder="Enrollment ID"
          value={formData.enrollmentId}
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
          name="courseId"
          placeholder="Course ID"
          value={formData.courseId}
          onChange={handleChange}
          required
        />

        <input
          name="departmentId"
          placeholder="Department ID"
          value={formData.departmentId}
          onChange={handleChange}
          required
        />

        <input
          name="academicYear"
          placeholder="Academic Year"
          value={formData.academicYear}
          onChange={handleChange}
          required
        />

        <input
          name="semester"
          type="number"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          required
        />

        <input
          name="enrollmentDate"
          type="date"
          value={formData.enrollmentDate}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>

        <button type="submit">
          {editingEnrollment
            ? "Update Enrollment"
            : "Add Enrollment"}
        </button>
      </form>

      <hr />

      <h3>Enrollment Records</h3>

      {enrollments.length === 0 ? (
        <p>No enrollments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Enrollment ID</th>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Department ID</th>
              <th>Academic Year</th>
              <th>Semester</th>
              <th>Enrollment Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment._id}>
                <td>{enrollment.enrollmentId}</td>
                <td>{enrollment.studentId}</td>
                <td>{enrollment.courseId}</td>
                <td>{enrollment.departmentId}</td>
                <td>{enrollment.academicYear}</td>
                <td>{enrollment.semester}</td>
                <td>
                  {enrollment.enrollmentDate
                    ? enrollment.enrollmentDate.split("T")[0]
                    : "-"}
                </td>
                <td>{enrollment.status}</td>

                <td>
                  <button
                    onClick={() => handleEdit(enrollment)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(enrollment._id)
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

export default Enrollments;