import { useState } from "react";
import api from "../api/api";

const AICommandCenter = () => {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommand = async (e) => {
    e.preventDefault();

    if (!command.trim()) return;

    try {
      setLoading(true);
      setResponse("");

      const result = await api.post("/ai", {
        command
      });

      if (result.data.tool === "get_students") {
        setResponse(
          result.data.data
            .map(
              (student) =>
                `${student.studentId} - ${student.name} - ${student.course}`
            )
            .join("\n")
        );
      } else if (result.data.tool === "get_attendance") {
        setResponse(
          result.data.data
            .map(
              (record) =>
                `${record.studentId} - ${record.subjectId} - ${record.status}`
            )
            .join("\n")
        );
      } else if (result.data.tool === "get_results") {
        setResponse(
          result.data.data
            .map(
              (result) =>
                `${result.studentId} - ${result.examId} - ${result.marksObtained} marks - Grade: ${result.grade}`
            )
            .join("\n")
        );
      } else if (result.data.tool === "get_subject_results") {
        setResponse(
          result.data.data.length === 0
            ? "No results found for this student."
            : result.data.data
              .map(
                (item) =>
                  `${item.studentId} - ${item.examId} - ${item.marksObtained} marks - Grade: ${item.grade}`
              )
              .join("\n")
        );
      } else if (result.data.tool === "get_fee_status") {
        setResponse(
          result.data.data
            .map(
              (fee) =>
                `${fee.studentId} - ₹${fee.amount} - ${fee.status} - Due: ${new Date(fee.dueDate).toLocaleDateString()}`
            )
            .join("\n")
        );
      } else {
        setResponse(
          result.data.message || "No response received"
        );
      }
    } catch (error) {
      setResponse(
        error.response?.data?.message ||
        "AI request failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dashboard">
      <h2>AI Command Center</h2>

      <p>
        Ask the AI assistant to analyze or retrieve ERP information.
      </p>

      <form onSubmit={handleCommand}>
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Example: Show student results"
          rows="5"
          style={{
            width: "100%",
            maxWidth: "700px",
            padding: "12px",
            marginTop: "20px"
          }}
        />

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Ask AI"}
        </button>
      </form>

      {response && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            maxWidth: "700px"
          }}
        >
          <h3>AI Response</h3>

          <p style={{ whiteSpace: "pre-line" }}>
            {response}
          </p>
        </div>
      )}
    </main>
  );
};

export default AICommandCenter;