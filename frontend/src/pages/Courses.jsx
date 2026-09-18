import { useEffect, useState } from "react";
import api from "../api/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    department: "",
    duration: "",
    description: ""
  });

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
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
        duration: Number(formData.duration)
      };

      if (editingCourse) {
        await api.put(`/courses/${editingCourse._id}`, data);
        alert("Course updated successfully");
        setEditingCourse(null);
      } else {
        await api.post("/courses", data);
        alert("Course added successfully");
      }

      setFormData({
        courseId: "",
        courseName: "",
        department: "",
        duration: "",
        description: ""
      });

      fetchCourses();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save course"
      );
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);

    setFormData({
      courseId: course.courseId,
      courseName: course.courseName,
      department: course.department,
      duration: course.duration,
      description: course.description || ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await api.delete(`/courses/${id}`);

      alert("Course deleted successfully");

      fetchCourses();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete course"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Courses</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="courseId"
          placeholder="Course ID"
          value={formData.courseId}
          onChange={handleChange}
          required
        />

        <input
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
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
          name="duration"
          type="number"
          placeholder="Duration (Years)"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          {editingCourse ? "Update Course" : "Add Course"}
        </button>
      </form>

      <hr />

      <h3>Course Records</h3>

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>{course.department}</td>
                <td>{course.duration} Years</td>
                <td>{course.description || "-"}</td>

                <td>
                  <button onClick={() => handleEdit(course)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(course._id)}>
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

export default Courses;