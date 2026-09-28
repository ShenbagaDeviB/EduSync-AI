import { useEffect, useState } from "react";
import api from "../api/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="dashboard">
      <h2>Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div>
          {users.map((user) => (
            <div
              className="dashboard-card"
              key={user._id}
              style={{
                maxWidth: "700px",
                marginTop: "15px"
              }}
            >
              <h3>{user.name}</h3>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Users;