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
    <main className="dashboard settings-page">
      <div className="settings-container">

        <div className="settings-header">
          <h2>Settings</h2>
          <p>
            Manage your application preferences and
            account session.
          </p>
        </div>

        {/* Appearance */}

        <div className="settings-card">
          <div className="settings-card-header">
            <h3>Appearance</h3>
            <p>
              Choose how the ERP interface should look.
            </p>
          </div>

          <div className="settings-field">
            <label htmlFor="theme">
              Theme
            </label>

            <select
              id="theme"
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {/* Session */}

        <div className="settings-card">
          <div className="settings-card-header">
            <h3>Session</h3>
            <p>
              Check your current login session and
              clear it when needed.
            </p>
          </div>

          <div className="settings-session">
            <div className="settings-session-info">
              <span>Session Status</span>

              <span
                className={`settings-status ${
                  sessionActive
                    ? "settings-status-active"
                    : "settings-status-inactive"
                }`}
              >
                {sessionActive
                  ? "Active"
                  : "Not Active"}
              </span>
            </div>

            <button
              type="button"
              className="delete-button"
              onClick={handleClearSession}
              disabled={!sessionActive}
            >
              Clear Session
            </button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Settings;