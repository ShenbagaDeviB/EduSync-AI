import { useEffect, useState } from "react";
import api from "../api/api";

const initialFormData = {
  subjectId: "",
  subjectName: "",
  courseId: "",
  semester: "",
  credits: "",
};

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  const fetchSubjects = async () => {
    try {
      const response = await api.get("/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch subjects:",
        error
      );
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingSubject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        semester: Number(formData.semester),
        credits: Number(formData.credits),
      };

      if (editingSubject) {
        await api.put(
          `/subjects/${editingSubject._id}`,
          data
        );

        alert("Subject updated successfully");
      } else {
        await api.post("/subjects", data);

        alert("Subject added successfully");
      }

      resetForm();
      fetchSubjects();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save subject"
      );
    }
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);

    setFormData({
      subjectId: subject.subjectId,
      subjectName: subject.subjectName,
      courseId: subject.courseId,
      semester: subject.semester,
      credits: subject.credits,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this subject?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/subjects/${id}`);

      alert("Subject deleted successfully");

      fetchSubjects();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete subject"
      );
    }
  };

  return (
    <main className="dashboard subjects-page">
      <div className="subjects-container">

        {/* Header */}

        <div className="subjects-header">
          <div>
            <h2>Subjects</h2>
            <p>
              Manage subjects, semesters, credits, and
              course associations.
            </p>
          </div>

          <div className="subjects-count">
            <strong>{subjects.length}</strong>
            <span>Total Subjects</span>
          </div>
        </div>

        {/* Form */}

        <div className="subjects-form-card">
          <h3>
            {editingSubject
              ? "Update Subject"
              : "Add Subject"}
          </h3>

          <form
            className="subjects-form"
            onSubmit={handleSubmit}
          >
            <div className="subjects-form-grid">

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
                <label htmlFor="subjectName">
                  Subject Name
                </label>

                <input
                  id="subjectName"
                  name="subjectName"
                  placeholder="Enter subject name"
                  value={formData.subjectName}
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
                <label htmlFor="semester">
                  Semester
                </label>

                <input
                  id="semester"
                  name="semester"
                  type="number"
                  placeholder="Enter semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="credits">
                  Credits
                </label>

                <input
                  id="credits"
                  name="credits"
                  type="number"
                  placeholder="Enter credits"
                  value={formData.credits}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="subjects-form-actions">
              {editingSubject && (
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
                {editingSubject
                  ? "Update Subject"
                  : "Add Subject"}
              </button>
            </div>
          </form>
        </div>

        {/* Records */}

        <div className="subjects-records-card">
          <div className="subjects-records-header">
            <h3>Subject Records</h3>
          </div>

          {subjects.length === 0 ? (
            <div className="subjects-empty-state">
              <h4>No subjects found</h4>
              <p>
                Add a subject to start managing subject
                records.
              </p>
            </div>
          ) : (
            <div className="subjects-table-wrapper">
              <table className="subjects-table">
                <thead>
                  <tr>
                    <th>Subject ID</th>
                    <th>Subject Name</th>
                    <th>Course ID</th>
                    <th>Semester</th>
                    <th>Credits</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject._id}>
                      <td className="subject-id">
                        {subject.subjectId}
                      </td>

                      <td className="subject-name">
                        {subject.subjectName}
                      </td>

                      <td className="subject-course-id">
                        {subject.courseId}
                      </td>

                      <td>
                        <span className="subject-semester-badge">
                          Semester {subject.semester}
                        </span>
                      </td>

                      <td>
                        <span className="subject-credits-badge">
                          {subject.credits} Credits
                        </span>
                      </td>

                      <td>
                        <div className="subject-actions">
                          <button
                            className="edit-button"
                            onClick={() =>
                              handleEdit(subject)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                subject._id
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

export default Subjects;