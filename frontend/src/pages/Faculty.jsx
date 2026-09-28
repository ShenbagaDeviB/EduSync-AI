import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  facultyId: "",
  name: "",
  email: "",
  department: "",
  designation: "",
};

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchFaculty = async () => {
    try {
      const response = await api.get("/faculties");
      setFaculty(response.data);
    } catch (error) {
      console.error("Failed to fetch faculty:", error);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingFaculty(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingFaculty) {
        await api.put(
          `/faculties/${editingFaculty._id}`,
          formData
        );

        alert("Faculty updated successfully");
      } else {
        await api.post("/faculties", formData);
        alert("Faculty added successfully");
      }

      resetForm();
      fetchFaculty();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save faculty"
      );
    }
  };

  const handleEdit = (member) => {
    setEditingFaculty(member);

    setFormData({
      facultyId: member.facultyId,
      name: member.name,
      email: member.email,
      department: member.department,
      designation: member.designation,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this faculty?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/faculties/${id}`);

      alert("Faculty deleted successfully");

      fetchFaculty();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete faculty"
      );
    }
  };

  return (
    <main className="dashboard faculty-page">
      <div className="faculty-container">

        <div className="faculty-header">
          <div>
            <h2>Faculty</h2>
            <p>
              Manage faculty members, departments, and
              designations.
            </p>
          </div>

          <div className="faculty-count">
            <strong>{faculty.length}</strong>
            <span>Total Faculty</span>
          </div>
        </div>

        <div className="faculty-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingFaculty
                  ? "Edit Faculty"
                  : "Add Faculty"}
              </h3>

              <p>
                {editingFaculty
                  ? "Update the faculty details below."
                  : "Enter the details to add a new faculty member."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="faculty-form-grid">

              <div className="form-group">
                <label htmlFor="facultyId">
                  Faculty ID
                </label>

                <input
                  id="facultyId"
                  name="facultyId"
                  placeholder="Enter faculty ID"
                  value={formData.facultyId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  placeholder="Enter faculty name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">
                  Department
                </label>

                <input
                  id="department"
                  name="department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="designation">
                  Designation
                </label>

                <input
                  id="designation"
                  name="designation"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="faculty-form-actions">

              {editingFaculty && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="primary-button"
              >
                {editingFaculty
                  ? "Update Faculty"
                  : "Add Faculty"}
              </button>

            </div>

          </form>
        </div>

        <div className="faculty-records-card">

          <div className="section-header">
            <div>
              <h3>Faculty Records</h3>
              <p>
                View and manage all faculty members.
              </p>
            </div>
          </div>

          {faculty.length === 0 ? (
            <div className="faculty-empty-state">
              <h4>No faculty found</h4>
              <p>
                Add your first faculty member using the
                form above.
              </p>
            </div>
          ) : (
            <div className="faculty-table-wrapper">

              <table className="faculty-table">

                <thead>
                  <tr>
                    <th>Faculty ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {faculty.map((member) => (
                    <tr key={member._id}>

                      <td className="faculty-id">
                        {member.facultyId}
                      </td>

                      <td className="faculty-name">
                        {member.name}
                      </td>

                      <td>{member.email}</td>

                      <td>
                        <span className="faculty-department-badge">
                          {member.department}
                        </span>
                      </td>

                      <td>
                        {member.designation}
                      </td>

                      <td>
                        <div className="faculty-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(member)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(member._id)
                            }
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </main>
  );
};

export default Faculty;