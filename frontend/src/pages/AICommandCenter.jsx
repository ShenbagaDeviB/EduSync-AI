import { useState } from "react";
import api from "../api/api";

const AICommandCenter = () => {
const [command, setCommand] = useState("");
const [response, setResponse] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleCommand = async (e) => {
e.preventDefault();

if (!command.trim()) return;

try {
  setLoading(true);
  setResponse("");
  setError("");

  const result = await api.post("/ai", {
    command,
  });

  if (result.data.tool === "get_students") {
    setResponse(
      result.data.data.length === 0
        ? "No students found."
        : result.data.data
            .map(
              (student) =>
                `${student.studentId} - ${student.name} - ${student.course}`
            )
            .join("\n")
    );
  } else if (result.data.tool === "get_attendance") {
    setResponse(
      result.data.data.length === 0
        ? "No attendance records found."
        : result.data.data
            .map(
              (record) =>
                `${record.studentId} - ${record.subjectId} - ${record.status}`
            )
            .join("\n")
    );
  } else if (result.data.tool === "get_results") {
    setResponse(
      result.data.data.length === 0
        ? "No results found."
        : result.data.data
            .map(
              (item) =>
                `${item.studentId} - ${item.examId} - ${item.marksObtained} marks - Grade: ${item.grade}`
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
      result.data.data.length === 0
        ? "No fee records found."
        : result.data.data
            .map(
              (fee) =>
                `${fee.studentId} - ₹${fee.amount} - ${fee.status} - Due: ${new Date(
                  fee.dueDate
                ).toLocaleDateString()}`
            )
            .join("\n")
    );
  } else {
    setResponse(result.data.message || "No response received.");
  }
} catch (error) {
  setError(
    error.response?.data?.message || "AI request failed. Please try again."
  );
} finally {
  setLoading(false);
}

};

const exampleCommands = [
"Show all students",
"Show student attendance",
"Show student results",
"Show fees",
];

const handleExample = (example) => {
setCommand(example);
};

return ( <main className="dashboard"> <div className="ai-command-container"> <div className="ai-command-header"> <div> <h2>AI Command Center</h2> <p>
Use natural language to retrieve and analyze information from
your ERP system. </p> </div>

      <div className="ai-status">
        <span className="ai-status-dot"></span>
        AI Assistant Ready
      </div>
    </div>

    <div className="ai-command-card">
      <form onSubmit={handleCommand}>
        <label htmlFor="ai-command">Your Command</label>

        <textarea
          id="ai-command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Example: Show student results"
          rows={5}
          disabled={loading}
          className="ai-command-input"
        />

        <div className="ai-command-footer">
          <span className="ai-hint">
            Ask about students, attendance, results or fees.
          </span>

          <button
            type="submit"
            disabled={loading || !command.trim()}
            className="ai-ask-button"
          >
            {loading ? "Processing..." : "Ask AI"}
          </button>
        </div>
      </form>

      <div className="ai-examples">
        <span>Try:</span>

        {exampleCommands.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => handleExample(example)}
            disabled={loading}
            className="ai-example-button"
          >
            {example}
          </button>
        ))}
      </div>
    </div>

    {loading && (
      <div className="ai-response-card">
        <div className="ai-response-header">
          <h3>AI Response</h3>
        </div>

        <div className="ai-loading">
          <span className="ai-spinner"></span>
          <span>AI is processing your request...</span>
        </div>
      </div>
    )}

    {error && !loading && (
      <div className="ai-response-card ai-error-card">
        <div className="ai-response-header">
          <h3>Request Failed</h3>
        </div>

        <p>{error}</p>
      </div>
    )}

    {response && !loading && !error && (
      <div className="ai-response-card">
        <div className="ai-response-header">
          <div>
            <h3>AI Response</h3>
            <span>Information retrieved from your ERP system</span>
          </div>

          <span className="ai-success-badge">Completed</span>
        </div>

        <div className="ai-response-content">
          {response}
        </div>
      </div>
    )}
  </div>
</main>

);
};

export default AICommandCenter;