import { useEffect, useState } from "react";
import api from "../api/api";

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [editingFaculty, setEditingFaculty] = useState(null);

  const [formData, setFormData] = useState({
    facultyId: "",
    name: "",
    email: "",
    department: "",
    designation: ""
  });

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
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingFaculty) {
        await api.put(`/faculties/${editingFaculty._id}`, formData);
        alert("Faculty updated successfully");
        setEditingFaculty(null);
      } else {
        await api.post("/faculties", formData);
        alert("Faculty added successfully");
      }

      setFormData({
        facultyId: "",
        name: "",
        email: "",
        department: "",
        designation: ""
      });

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
      designation: member.designation
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) {
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
    <main className="dashboard">
      <h2>Faculty</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="facultyId"
          placeholder="Faculty ID"
          value={formData.facultyId}
          onChange={handleChange}
          required
        />

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingFaculty ? "Update Faculty" : "Add Faculty"}
        </button>
      </form>

      <hr />

      <h3>Faculty Records</h3>

      {faculty.length === 0 ? (
        <p>No faculty found.</p>
      ) : (
        <table>
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
                <td>{member.facultyId}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.department}</td>
                <td>{member.designation}</td>

                <td>
                  <button onClick={() => handleEdit(member)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(member._id)}>
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

export default Faculty;