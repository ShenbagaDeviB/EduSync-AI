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

      setResponse(result.data.message);
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
          placeholder="Example: Show students with attendance below 75%"
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
          <p>{response}</p>
        </div>
      )}
    </main>
  );
};

export default AICommandCenter;