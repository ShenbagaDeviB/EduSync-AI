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
      console.error(
        "Failed to fetch users:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getInitial = (name) => {
    if (!name) {
      return "U";
    }

    return name.charAt(0).toUpperCase();
  };

  return (
    <main className="dashboard users-page">
      <div className="users-container">

        {/* Header */}

        <div className="users-header">
          <div>
            <h2>Users</h2>
            <p>
              View registered users and their assigned
              system roles.
            </p>
          </div>

          <div className="users-count">
            <strong>{users.length}</strong>
            <span>Total Users</span>
          </div>
        </div>

        {/* Records */}

        {loading ? (
          <div className="users-state">
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="users-state">
            <h4>No users found</h4>
            <p>
              There are currently no registered users.
            </p>
          </div>
        ) : (
          <div className="users-records-card">
            <div className="users-records-header">
              <h3>User Records</h3>
            </div>

            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="user-identity">
                          <div className="user-avatar">
                            {getInitial(user.name)}
                          </div>

                          <strong>
                            {user.name}
                          </strong>
                        </div>
                      </td>

                      <td className="user-email">
                        {user.email}
                      </td>

                      <td>
                        <span
                          className={`user-role-badge user-role-${String(
                            user.role || "user"
                          ).toLowerCase()}`}
                        >
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default Users;