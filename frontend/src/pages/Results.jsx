import { useEffect, useState } from "react";
import api from "../api/api";

const Results = () => {
  const [results, setResults] = useState([]);
  const [editingResult, setEditingResult] = useState(null);

  const [formData, setFormData] = useState({
    resultId: "",
    studentId: "",
    examId: "",
    marksObtained: "",
    grade: ""
  });

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
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        marksObtained: Number(formData.marksObtained)
      };

      if (editingResult) {
        await api.put(`/results/${editingResult._id}`, data);

        alert("Result updated successfully");
        setEditingResult(null);
      } else {
        await api.post("/results", data);
        alert("Result added successfully");
      }

      setFormData({
        resultId: "",
        studentId: "",
        examId: "",
        marksObtained: "",
        grade: ""
      });

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
      grade: result.grade
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result?")) {
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
    <main className="dashboard">
      <h2>Results</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="resultId"
          placeholder="Result ID"
          value={formData.resultId}
          onChange={handleChange}
          required
        />

        <input
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <input
          name="examId"
          placeholder="Exam ID"
          value={formData.examId}
          onChange={handleChange}
          required
        />

        <input
          name="marksObtained"
          type="number"
          placeholder="Marks Obtained"
          value={formData.marksObtained}
          onChange={handleChange}
          required
        />

        <input
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingResult ? "Update Result" : "Add Result"}
        </button>
      </form>

      <hr />

      <h3>Result Records</h3>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table>
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
                <td>{result.resultId}</td>
                <td>{result.studentId}</td>
                <td>{result.examId}</td>
                <td>{result.marksObtained}</td>
                <td>{result.grade}</td>

                <td>
                  <button
                    onClick={() => handleEdit(result)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(result._id)}
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

export default Results;