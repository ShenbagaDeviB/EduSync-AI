import { useEffect, useState } from "react";

const Settings = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setSessionActive(!!token);

    const savedTheme =
      localStorage.getItem("theme") || "light";

    setTheme(savedTheme);
  }, []);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;

    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  const handleClearSession = () => {
    localStorage.removeItem("token");
    setSessionActive(false);

    alert("Session cleared successfully");

    window.location.href = "/login";
  };

  return (
    <main className="dashboard">
      <h2>Settings</h2>

      <div
        className="dashboard-card"
        style={{
          maxWidth: "700px",
          marginTop: "20px"
        }}
      >
        <h3>Appearance</h3>

        <label>
          Theme:
          <select
            value={theme}
            onChange={handleThemeChange}
            style={{ marginLeft: "10px" }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <div
        className="dashboard-card"
        style={{
          maxWidth: "700px",
          marginTop: "20px"
        }}
      >
        <h3>Session</h3>

        <p>
          <strong>Status:</strong>{" "}
          {sessionActive ? "Active" : "Not Active"}
        </p>

        <button
          onClick={handleClearSession}
          disabled={!sessionActive}
        >
          Clear Session
        </button>
      </div>
    </main>
  );
};

export default Settings;