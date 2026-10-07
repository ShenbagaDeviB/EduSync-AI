import { useEffect, useState } from "react";
import api from "../api/api";

const initialFormData = {
  resultId: "",
  studentId: "",
  examId: "",
  marksObtained: "",
  grade: "",
};

const Results = () => {
  const [results, setResults] = useState([]);
  const [editingResult, setEditingResult] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  const fetchResults = async () => {
    try {
      const response = await api.get("/results");
      setResults(response.data);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        marksObtained: Number(formData.marksObtained),
      };

      if (editingResult) {
        await api.put(`/results/${editingResult._id}`, data);

        alert("Result updated successfully");
        setEditingResult(null);
      } else {
        await api.post("/results", data);
        alert("Result added successfully");
      }

      resetForm();
      fetchResults();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save result"
      );
    }
  };

  const handleEdit = (result) => {
    setEditingResult(result);

    setFormData({
      resultId: result.resultId,
      studentId: result.studentId,
      examId: result.examId,
      marksObtained: result.marksObtained,
      grade: result.grade,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this result?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/results/${id}`);

      alert("Result deleted successfully");

      fetchResults();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete result"
      );
    }
  };

  return (
    <main className="dashboard results-page">
      <div className="results-container">

        {/* Header */}

        <div className="results-header">
          <div>
            <h2>Results</h2>
            <p>
              Manage student examination results and
              academic performance records.
            </p>
          </div>

          <div className="results-count">
            <strong>{results.length}</strong>
            <span>Total Results</span>
          </div>
        </div>

        {/* Form */}

        <div className="results-form-card">
          <h3>
            {editingResult
              ? "Update Result"
              : "Add Result"}
          </h3>

          <form
            className="results-form"
            onSubmit={handleSubmit}
          >
            <div className="results-form-grid">

              <div className="form-group">
                <label htmlFor="resultId">
                  Result ID
                </label>

                <input
                  id="resultId"
                  name="resultId"
                  placeholder="Enter result ID"
                  value={formData.resultId}
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
                <label htmlFor="marksObtained">
                  Marks Obtained
                </label>

                <input
                  id="marksObtained"
                  name="marksObtained"
                  type="number"
                  placeholder="Enter marks"
                  value={formData.marksObtained}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="grade">
                  Grade
                </label>

                <input
                  id="grade"
                  name="grade"
                  placeholder="Enter grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="results-form-actions">
              {editingResult && (
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
                {editingResult
                  ? "Update Result"
                  : "Add Result"}
              </button>
            </div>
          </form>
        </div>

        {/* Records */}

        <div className="results-records-card">
          <div className="results-records-header">
            <h3>Result Records</h3>
          </div>

          {results.length === 0 ? (
            <div className="results-empty-state">
              <h4>No results found</h4>
              <p>
                Add a result to start managing academic
                performance records.
              </p>
            </div>
          ) : (
            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Result ID</th>
                    <th>Student ID</th>
                    <th>Exam ID</th>
                    <th>Marks Obtained</th>
                    <th>Grade</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {results.map((result) => (
                    <tr key={result._id}>
                      <td className="result-id">
                        {result.resultId}
                      </td>

                      <td className="result-student-id">
                        {result.studentId}
                      </td>

                      <td className="result-exam-id">
                        {result.examId}
                      </td>

                      <td className="result-marks">
                        {result.marksObtained}
                      </td>

                      <td>
                        <span className="result-grade-badge">
                          {result.grade}
                        </span>
                      </td>

                      <td>
                        <div className="result-actions">
                          <button
                            className="edit-button"
                            onClick={() =>
                              handleEdit(result)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(result._id)
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

export default Results;