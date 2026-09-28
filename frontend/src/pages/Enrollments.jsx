import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  enrollmentId: "",
  studentId: "",
  courseId: "",
  departmentId: "",
  academicYear: "",
  semester: "",
  enrollmentDate: "",
  status: "Active",
};

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [editingEnrollment, setEditingEnrollment] = useState(null);
  const [formData, setFormData] = useState(initialForm);

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
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingEnrollment(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        semester: Number(formData.semester),
      };

      if (editingEnrollment) {
        await api.put(
          `/enrollments/${editingEnrollment._id}`,
          data
        );

        alert("Enrollment updated successfully");
      } else {
        await api.post("/enrollments", data);
        alert("Enrollment added successfully");
      }

      resetForm();
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
      status: enrollment.status,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this enrollment?"
      )
    ) {
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
    <main className="dashboard enrollments-page">
      <div className="enrollments-container">

        <div className="enrollments-header">
          <div>
            <h2>Enrollments</h2>
            <p>
              Manage student course enrollments and academic records.
            </p>
          </div>

          <div className="enrollments-count">
            <strong>{enrollments.length}</strong>
            <span>Total Enrollments</span>
          </div>
        </div>

        <div className="enrollment-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingEnrollment
                  ? "Edit Enrollment"
                  : "Add Enrollment"}
              </h3>

              <p>
                {editingEnrollment
                  ? "Update the enrollment details below."
                  : "Enter the details to create a new enrollment."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="enrollment-form-grid">

              <div className="form-group">
                <label htmlFor="enrollmentId">
                  Enrollment ID
                </label>

                <input
                  id="enrollmentId"
                  name="enrollmentId"
                  placeholder="Enter enrollment ID"
                  value={formData.enrollmentId}
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
                <label htmlFor="courseId">
                  Course ID
                </label>

                <input
                  id="courseId"
                  name="courseId"
                  placeholder="Enter course ID"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="departmentId">
                  Department ID
                </label>

                <input
                  id="departmentId"
                  name="departmentId"
                  placeholder="Enter department ID"
                  value={formData.departmentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="academicYear">
                  Academic Year
                </label>

                <input
                  id="academicYear"
                  name="academicYear"
                  placeholder="e.g. 2026-27"
                  value={formData.academicYear}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="semester">
                  Semester
                </label>

                <input
                  id="semester"
                  name="semester"
                  type="number"
                  min="1"
                  placeholder="Enter semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="enrollmentDate">
                  Enrollment Date
                </label>

                <input
                  id="enrollmentDate"
                  name="enrollmentDate"
                  type="date"
                  value={formData.enrollmentDate}
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
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </div>

            </div>

            <div className="enrollment-form-actions">

              {editingEnrollment && (
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
                {editingEnrollment
                  ? "Update Enrollment"
                  : "Add Enrollment"}
              </button>

            </div>

          </form>
        </div>

        <div className="enrollment-records-card">

          <div className="section-header">
            <div>
              <h3>Enrollment Records</h3>
              <p>
                View and manage all student enrollments.
              </p>
            </div>
          </div>

          {enrollments.length === 0 ? (
            <div className="enrollment-empty-state">
              <h4>No enrollments found</h4>
              <p>
                Add your first enrollment using the form above.
              </p>
            </div>
          ) : (
            <div className="enrollment-table-wrapper">

              <table className="enrollment-table">

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

                      <td className="enrollment-id">
                        {enrollment.enrollmentId}
                      </td>

                      <td>{enrollment.studentId}</td>

                      <td>{enrollment.courseId}</td>

                      <td>{enrollment.departmentId}</td>

                      <td>{enrollment.academicYear}</td>

                      <td>
                        <span className="semester-badge">
                          Sem {enrollment.semester}
                        </span>
                      </td>

                      <td>
                        {enrollment.enrollmentDate
                          ? enrollment.enrollmentDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <span
                          className={`enrollment-status-badge ${
                            enrollment.status === "Active"
                              ? "enrollment-active"
                              : enrollment.status === "Completed"
                              ? "enrollment-completed"
                              : "enrollment-dropped"
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </td>

                      <td>
                        <div className="enrollment-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(enrollment)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(enrollment._id)
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

export default Enrollments;