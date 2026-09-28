import { useEffect, useState } from "react";
import api from "../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const payload = JSON.parse(
          atob(token.split(".")[1])
        );

        const response = await api.get("/users");

        const currentUser = response.data.find(
          (item) => item._id === payload.id
        );

        setUser(currentUser);
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <main className="dashboard">
      <h2>My Profile</h2>

      {loading ? (
        <p>Loading profile...</p>
      ) : !user ? (
        <p>Profile not found.</p>
      ) : (
        <div
          className="dashboard-card"
          style={{
            maxWidth: "700px",
            marginTop: "20px"
          }}
        >
          <h3>{user.name}</h3>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          <p>
            <strong>User ID:</strong> {user._id}
          </p>
        </div>
      )}
    </main>
  );
};

export default Profile;