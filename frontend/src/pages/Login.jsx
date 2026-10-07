import { useState } from "react";
import api from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      alert("Login successful");
      console.log(response.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <main className="login-page">

      <div className="login-container">

        <div className="login-card">

          <div className="login-header">
            <div className="login-logo">
              ERP
            </div>

            <h1>Educational ERP</h1>

            <p>
              Sign in to access your ERP dashboard
            </p>
          </div>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <button
              type="submit"
              className="primary-button login-button"
            >
              Login
            </button>

          </form>

          <div className="login-footer">
            <span>
              Educational ERP Management System
            </span>
          </div>

        </div>

      </div>

    </main>
  );
};

export default Login;