import { useEffect, useState } from "react";
import api from "../api/api";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);

  const [formData, setFormData] = useState({
    examId: "",
    examName: "",
    subjectId: "",
    examDate: "",
    maxMarks: ""
  });

  const fetchExams = async () => {
    try {
      const response = await api.get("/exams");
      setExams(response.data);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
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
        maxMarks: Number(formData.maxMarks)
      };

      if (editingExam) {
        await api.put(`/exams/${editingExam._id}`, data);

        alert("Exam updated successfully");
        setEditingExam(null);
      } else {
        await api.post("/exams", data);
        alert("Exam added successfully");
      }

      setFormData({
        examId: "",
        examName: "",
        subjectId: "",
        examDate: "",
        maxMarks: ""
      });

      fetchExams();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save exam"
      );
    }
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);

    setFormData({
      examId: exam.examId,
      examName: exam.examName,
      subjectId: exam.subjectId,
      examDate: exam.examDate.split("T")[0],
      maxMarks: exam.maxMarks
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) {
      return;
    }

    try {
      await api.delete(`/exams/${id}`);

      alert("Exam deleted successfully");

      fetchExams();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete exam"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Exams</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="examId"
          placeholder="Exam ID"
          value={formData.examId}
          onChange={handleChange}
          required
        />

        <input
          name="examName"
          placeholder="Exam Name"
          value={formData.examName}
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
          name="examDate"
          type="date"
          value={formData.examDate}
          onChange={handleChange}
          required
        />

        <input
          name="maxMarks"
          type="number"
          placeholder="Maximum Marks"
          value={formData.maxMarks}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingExam ? "Update Exam" : "Add Exam"}
        </button>
      </form>

      <hr />

      <h3>Exam Records</h3>

      {exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Exam Name</th>
              <th>Subject ID</th>
              <th>Exam Date</th>
              <th>Max Marks</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr key={exam._id}>
                <td>{exam.examId}</td>
                <td>{exam.examName}</td>
                <td>{exam.subjectId}</td>
                <td>{exam.examDate.split("T")[0]}</td>
                <td>{exam.maxMarks}</td>

                <td>
                  <button
                    onClick={() => handleEdit(exam)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(exam._id)}
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

export default Exams;