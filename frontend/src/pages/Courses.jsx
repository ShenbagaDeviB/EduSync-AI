import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  courseId: "",
  courseName: "",
  department: "",
  duration: "",
  description: "",
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState(initialForm);

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
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingCourse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        duration: Number(formData.duration),
      };

      if (editingCourse) {
        await api.put(`/courses/${editingCourse._id}`, data);

        alert("Course updated successfully");
      } else {
        await api.post("/courses", data);

        alert("Course added successfully");
      }

      resetForm();
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
      description: course.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this course?"
      )
    ) {
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
    <main className="dashboard courses-page">
      <div className="courses-container">

        {/* Header */}

        <div className="courses-header">
          <div>
            <h2>Courses</h2>
            <p>
              Create and manage academic courses.
            </p>
          </div>

          <div className="courses-count">
            <strong>{courses.length}</strong>
            <span>Total Courses</span>
          </div>
        </div>

        {/* Form */}

        <div className="course-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingCourse
                  ? "Edit Course"
                  : "Create Course"}
              </h3>

              <p>
                {editingCourse
                  ? "Update the course details below."
                  : "Enter the details to create a new course."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="course-form-grid">

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
                <label htmlFor="courseName">
                  Course Name
                </label>

                <input
                  id="courseName"
                  name="courseName"
                  placeholder="Enter course name"
                  value={formData.courseName}
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
                <label htmlFor="duration">
                  Duration (Years)
                </label>

                <input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  placeholder="Enter duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter course description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

            </div>

            <div className="course-form-actions">

              {editingCourse && (
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
                {editingCourse
                  ? "Update Course"
                  : "Add Course"}
              </button>

            </div>

          </form>
        </div>

        {/* Records */}

        <div className="course-records-card">

          <div className="section-header">
            <div>
              <h3>Course Records</h3>
              <p>
                View and manage all academic courses.
              </p>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="course-empty-state">
              <h4>No courses found</h4>
              <p>
                Create your first course using the form above.
              </p>
            </div>
          ) : (
            <div className="course-table-wrapper">

              <table className="course-table">

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

                      <td className="course-id">
                        {course.courseId}
                      </td>

                      <td className="course-name">
                        {course.courseName}
                      </td>

                      <td>
                        {course.department}
                      </td>

                      <td>
                        {course.duration} Years
                      </td>

                      <td className="course-description">
                        {course.description || "-"}
                      </td>

                      <td>
                        <div className="course-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(course)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(course._id)
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

export default Courses;