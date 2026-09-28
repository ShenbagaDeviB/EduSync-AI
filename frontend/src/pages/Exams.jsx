import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  examId: "",
  examName: "",
  subjectId: "",
  examDate: "",
  maxMarks: "",
};

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null);
  const [formData, setFormData] = useState(initialForm);

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
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingExam(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        maxMarks: Number(formData.maxMarks),
      };

      if (editingExam) {
        await api.put(`/exams/${editingExam._id}`, data);

        alert("Exam updated successfully");
      } else {
        await api.post("/exams", data);
        alert("Exam added successfully");
      }

      resetForm();
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
      examDate: exam.examDate
        ? exam.examDate.split("T")[0]
        : "",
      maxMarks: exam.maxMarks,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this exam?"
      )
    ) {
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
    <main className="dashboard exams-page">
      <div className="exams-container">

        <div className="exams-header">
          <div>
            <h2>Exams</h2>
            <p>
              Manage examinations, subjects, schedules, and marks.
            </p>
          </div>

          <div className="exams-count">
            <strong>{exams.length}</strong>
            <span>Total Exams</span>
          </div>
        </div>

        <div className="exam-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingExam
                  ? "Edit Exam"
                  : "Add Exam"}
              </h3>

              <p>
                {editingExam
                  ? "Update the examination details below."
                  : "Enter the details to create a new exam."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="exam-form-grid">

              <div className="form-group">
                <label htmlFor="examId">
                  Exam ID
                </label>

                <input
                  id="examId"
                  name="examId"
                  placeholder="Enter exam ID"
                  value={formData.examId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="examName">
                  Exam Name
                </label>

                <input
                  id="examName"
                  name="examName"
                  placeholder="Enter exam name"
                  value={formData.examName}
                  onChange={handleChange}
                  required
                />
              </div>

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
                <label htmlFor="examDate">
                  Exam Date
                </label>

                <input
                  id="examDate"
                  name="examDate"
                  type="date"
                  value={formData.examDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxMarks">
                  Maximum Marks
                </label>

                <input
                  id="maxMarks"
                  name="maxMarks"
                  type="number"
                  min="1"
                  placeholder="Enter maximum marks"
                  value={formData.maxMarks}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="exam-form-actions">

              {editingExam && (
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
                {editingExam
                  ? "Update Exam"
                  : "Add Exam"}
              </button>

            </div>

          </form>
        </div>

        <div className="exam-records-card">

          <div className="section-header">
            <div>
              <h3>Exam Records</h3>
              <p>
                View and manage all examination records.
              </p>
            </div>
          </div>

          {exams.length === 0 ? (
            <div className="exam-empty-state">
              <h4>No exams found</h4>
              <p>
                Add your first exam using the form above.
              </p>
            </div>
          ) : (
            <div className="exam-table-wrapper">

              <table className="exam-table">

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

                      <td className="exam-id">
                        {exam.examId}
                      </td>

                      <td className="exam-name">
                        {exam.examName}
                      </td>

                      <td>
                        {exam.subjectId}
                      </td>

                      <td>
                        {exam.examDate
                          ? exam.examDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <span className="max-marks-badge">
                          {exam.maxMarks}
                        </span>
                      </td>

                      <td>
                        <div className="exam-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(exam)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(exam._id)
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

export default Exams;