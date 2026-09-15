import { useEffect, useState } from "react";
import api from "../api/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    department: "",
    course: "",
    year: ""
  });

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
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
      if (editingStudent) {
        await api.put(`/students/${editingStudent._id}`, {
          ...formData,
          year: Number(formData.year)
        });

        alert("Student updated successfully");

        setEditingStudent(null);
      } else {
        await api.post("/students", {
          ...formData,
          year: Number(formData.year)
        });

        alert("Student added successfully");
      }

      setFormData({
        studentId: "",
        name: "",
        email: "",
        department: "",
        course: "",
        year: ""
      });

      fetchStudents();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save student"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await api.delete(`/students/${id}`);

      alert("Student deleted successfully");

      fetchStudents();
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to delete student"
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
      year: student.year
    });
  };

  return (
    <main className="dashboard">
      <h2>Students</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <input
          name="year"
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </form>

      <hr />

      <h3>Student Records</h3>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
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
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
                <td>
                  <button onClick={() => handleEdit(student)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(student._id)}>
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

export default Students;