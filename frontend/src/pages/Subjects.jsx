import { useEffect, useState } from "react";
import api from "../api/api";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);

  const [formData, setFormData] = useState({
    subjectId: "",
    subjectName: "",
    courseId: "",
    semester: "",
    credits: ""
  });

  const fetchSubjects = async () => {
    try {
      const response = await api.get("/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
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
        semester: Number(formData.semester),
        credits: Number(formData.credits)
      };

      if (editingSubject) {
        await api.put(`/subjects/${editingSubject._id}`, data);
        alert("Subject updated successfully");
        setEditingSubject(null);
      } else {
        await api.post("/subjects", data);
        alert("Subject added successfully");
      }

      setFormData({
        subjectId: "",
        subjectName: "",
        courseId: "",
        semester: "",
        credits: ""
      });

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
      credits: subject.credits
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
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
    <main className="dashboard">
      <h2>Subjects</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="subjectId"
          placeholder="Subject ID"
          value={formData.subjectId}
          onChange={handleChange}
          required
        />

        <input
          name="subjectName"
          placeholder="Subject Name"
          value={formData.subjectName}
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
          name="semester"
          type="number"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          required
        />

        <input
          name="credits"
          type="number"
          placeholder="Credits"
          value={formData.credits}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingSubject ? "Update Subject" : "Add Subject"}
        </button>
      </form>

      <hr />

      <h3>Subject Records</h3>

      {subjects.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <table>
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
                <td>{subject.subjectId}</td>
                <td>{subject.subjectName}</td>
                <td>{subject.courseId}</td>
                <td>{subject.semester}</td>
                <td>{subject.credits}</td>

                <td>
                  <button onClick={() => handleEdit(subject)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(subject._id)}>
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

export default Subjects;