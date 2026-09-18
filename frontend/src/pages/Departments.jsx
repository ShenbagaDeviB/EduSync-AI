import { useEffect, useState } from "react";
import api from "../api/api";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [formData, setFormData] = useState({
    departmentId: "",
    name: "",
    code: "",
    description: "",
    headFacultyId: ""
  });

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
      [e.target.name]: e.target.value
    });
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
        setEditingDepartment(null);
      } else {
        await api.post("/departments", formData);
        alert("Department added successfully");
      }

      setFormData({
        departmentId: "",
        name: "",
        code: "",
        description: "",
        headFacultyId: ""
      });

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
      headFacultyId: department.headFacultyId || ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) {
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
    <main className="dashboard">
      <h2>Departments</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="departmentId"
          placeholder="Department ID"
          value={formData.departmentId}
          onChange={handleChange}
          required
        />

        <input
          name="name"
          placeholder="Department Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="code"
          placeholder="Department Code"
          value={formData.code}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="headFacultyId"
          placeholder="Head Faculty ID"
          value={formData.headFacultyId}
          onChange={handleChange}
        />

        <button type="submit">
          {editingDepartment
            ? "Update Department"
            : "Add Department"}
        </button>
      </form>

      <hr />

      <h3>Department Records</h3>

      {departments.length === 0 ? (
        <p>No departments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Description</th>
              <th>Head Faculty ID</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td>{department.departmentId}</td>
                <td>{department.name}</td>
                <td>{department.code}</td>
                <td>{department.description || "-"}</td>
                <td>{department.headFacultyId || "-"}</td>

                <td>
                  <button
                    onClick={() => handleEdit(department)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(department._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default Departments;