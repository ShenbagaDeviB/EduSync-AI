import { useEffect, useState } from "react";
import api from "../api/api";

const initialFormData = {
  studentId: "",
  name: "",
  email: "",
  department: "",
  course: "",
  year: "",
};

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch students:",
        error
      );
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingStudent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        year: Number(formData.year),
      };

      if (editingStudent) {
        await api.put(
          `/students/${editingStudent._id}`,
          data
        );

        alert("Student updated successfully");
      } else {
        await api.post("/students", data);

        alert("Student added successfully");
      }

      resetForm();
      fetchStudents();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save student"
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this student?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/students/${id}`);

      alert("Student deleted successfully");

      fetchStudents();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete student"
      );
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);

    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      department: student.department,
      course: student.course,
      year: student.year,
    });
  };

  return (
    <main className="dashboard students-page">
      <div className="students-container">

        {/* Header */}

        <div className="students-header">
          <div>
            <h2>Students</h2>
            <p>
              Manage student information and academic
              records.
            </p>
          </div>

          <div className="students-count">
            <strong>{students.length}</strong>
            <span>Total Students</span>
          </div>
        </div>

        {/* Form */}

        <div className="students-form-card">
          <h3>
            {editingStudent
              ? "Update Student"
              : "Add Student"}
          </h3>

          <form
            className="students-form"
            onSubmit={handleSubmit}
          >
            <div className="students-form-grid">

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
                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  placeholder="Enter student name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">
                  Department
                </label>

                <input
                  id="department"
                  name="department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="course">
                  Course
                </label>

                <input
                  id="course"
                  name="course"
                  placeholder="Enter course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">
                  Year
                </label>

                <input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="Enter year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="students-form-actions">
              {editingStudent && (
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
                {editingStudent
                  ? "Update Student"
                  : "Add Student"}
              </button>
            </div>
          </form>
        </div>

        {/* Records */}

        <div className="students-records-card">
          <div className="students-records-header">
            <h3>Student Records</h3>
          </div>

          {students.length === 0 ? (
            <div className="students-empty-state">
              <h4>No students found</h4>
              <p>
                Add a student to start managing student
                records.
              </p>
            </div>
          ) : (
            <div className="students-table-wrapper">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td className="student-id">
                        {student.studentId}
                      </td>

                      <td className="student-name">
                        {student.name}
                      </td>

                      <td>{student.email}</td>

                      <td>{student.department}</td>

                      <td>{student.course}</td>

                      <td className="student-year">
                        {student.year}
                      </td>

                      <td>
                        <div className="student-actions">
                          <button
                            className="edit-button"
                            onClick={() =>
                              handleEdit(student)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                student._id
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

export default Students;