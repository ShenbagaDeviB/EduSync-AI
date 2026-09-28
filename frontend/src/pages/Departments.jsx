import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  departmentId: "",
  name: "",
  code: "",
  description: "",
  headFacultyId: "",
};

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingDepartment(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDepartment) {
        await api.put(
          `/departments/${editingDepartment._id}`,
          formData
        );

        alert("Department updated successfully");
      } else {
        await api.post("/departments", formData);

        alert("Department added successfully");
      }

      resetForm();
      fetchDepartments();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save department"
      );
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);

    setFormData({
      departmentId: department.departmentId,
      name: department.name,
      code: department.code,
      description: department.description || "",
      headFacultyId: department.headFacultyId || "",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this department?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/departments/${id}`);

      alert("Department deleted successfully");

      fetchDepartments();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete department"
      );
    }
  };

  return (
    <main className="dashboard departments-page">
      <div className="departments-container">

        {/* Header */}

        <div className="departments-header">
          <div>
            <h2>Departments</h2>
            <p>
              Create and manage academic departments.
            </p>
          </div>

          <div className="departments-count">
            <strong>{departments.length}</strong>
            <span>Total Departments</span>
          </div>
        </div>

        {/* Form */}

        <div className="department-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingDepartment
                  ? "Edit Department"
                  : "Create Department"}
              </h3>

              <p>
                {editingDepartment
                  ? "Update the department details below."
                  : "Enter the details to create a new department."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="department-form-grid">

              <div className="form-group">
                <label htmlFor="departmentId">
                  Department ID
                </label>

                <input
                  id="departmentId"
                  name="departmentId"
                  placeholder="Enter department ID"
                  value={formData.departmentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">
                  Department Name
                </label>

                <input
                  id="name"
                  name="name"
                  placeholder="Enter department name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="code">
                  Department Code
                </label>

                <input
                  id="code"
                  name="code"
                  placeholder="Enter department code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="headFacultyId">
                  Head Faculty ID
                </label>

                <input
                  id="headFacultyId"
                  name="headFacultyId"
                  placeholder="Enter faculty ID"
                  value={formData.headFacultyId}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter department description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

            </div>

            <div className="department-form-actions">

              {editingDepartment && (
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
                {editingDepartment
                  ? "Update Department"
                  : "Add Department"}
              </button>

            </div>

          </form>
        </div>

        {/* Records */}

        <div className="department-records-card">

          <div className="section-header">
            <div>
              <h3>Department Records</h3>
              <p>
                View and manage all academic departments.
              </p>
            </div>
          </div>

          {departments.length === 0 ? (
            <div className="department-empty-state">
              <h4>No departments found</h4>
              <p>
                Create your first department using the form above.
              </p>
            </div>
          ) : (
            <div className="department-table-wrapper">

              <table className="department-table">

                <thead>
                  <tr>
                    <th>Department ID</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Head Faculty</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {departments.map((department) => (
                    <tr key={department._id}>

                      <td className="department-id">
                        {department.departmentId}
                      </td>

                      <td className="department-name">
                        {department.name}
                      </td>

                      <td>
                        <span className="department-code">
                          {department.code}
                        </span>
                      </td>

                      <td className="department-description">
                        {department.description || "-"}
                      </td>

                      <td>
                        {department.headFacultyId || "-"}
                      </td>

                      <td>
                        <div className="department-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(department)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                department._id
                              )
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

export default Departments;