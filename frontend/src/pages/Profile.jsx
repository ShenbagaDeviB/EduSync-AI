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
    <main className="dashboard profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <h2>My Profile</h2>
          <p>
            View your account information and profile details.
          </p>
        </div>

        {loading ? (
          <div className="profile-state">
            <p>Loading profile...</p>
          </div>
        ) : !user ? (
          <div className="profile-state">
            <h4>Profile not found</h4>
            <p>
              Unable to load your profile information.
            </p>
          </div>
        ) : (
          <div className="profile-card">

            <div className="profile-top">

              <div className="profile-avatar">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div className="profile-identity">
                <h3>{user.name}</h3>

                <span
                  className={`profile-role profile-role-${user.role?.toLowerCase()}`}
                >
                  {user.role}
                </span>
              </div>

            </div>

            <div className="profile-divider" />

            <div className="profile-details">

              <div className="profile-detail-item">
                <span>Name</span>
                <strong>{user.name}</strong>
              </div>

              <div className="profile-detail-item">
                <span>Email</span>
                <strong>{user.email}</strong>
              </div>

              <div className="profile-detail-item">
                <span>Role</span>
                <strong>{user.role}</strong>
              </div>

              <div className="profile-detail-item">
                <span>User ID</span>
                <strong>{user._id}</strong>
              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
};

export default Profile;