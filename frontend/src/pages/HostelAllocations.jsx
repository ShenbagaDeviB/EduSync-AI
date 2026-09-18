import { useEffect, useState } from "react";
import api from "../api/api";

const HostelAllocations = () => {
  const [allocations, setAllocations] = useState([]);
  const [editingAllocation, setEditingAllocation] = useState(null);

  const [formData, setFormData] = useState({
    allocationId: "",
    studentId: "",
    hostelId: "",
    roomId: "",
    allocationDate: "",
    vacateDate: "",
    status: "Active"
  });

  const fetchAllocations = async () => {
    try {
      const response = await api.get("/hostel-allocations");
      setAllocations(response.data);
    } catch (error) {
      console.error("Failed to fetch hostel allocations:", error);
    }
  };

  useEffect(() => {
    fetchAllocations();
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
      const data = {
        ...formData,
        allocationDate: new Date(formData.allocationDate),
        vacateDate: formData.vacateDate
          ? new Date(formData.vacateDate)
          : undefined
      };

      if (editingAllocation) {
        await api.put(
          `/hostel-allocations/${editingAllocation._id}`,
          data
        );

        alert("Hostel allocation updated successfully");
        setEditingAllocation(null);
      } else {
        await api.post("/hostel-allocations", data);
        alert("Hostel allocation added successfully");
      }

      setFormData({
        allocationId: "",
        studentId: "",
        hostelId: "",
        roomId: "",
        allocationDate: "",
        vacateDate: "",
        status: "Active"
      });

      fetchAllocations();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save hostel allocation"
      );
    }
  };

  const handleEdit = (allocation) => {
    setEditingAllocation(allocation);

    setFormData({
      allocationId: allocation.allocationId,
      studentId: allocation.studentId,
      hostelId: allocation.hostelId,
      roomId: allocation.roomId,
      allocationDate: allocation.allocationDate
        ? allocation.allocationDate.split("T")[0]
        : "",
      vacateDate: allocation.vacateDate
        ? allocation.vacateDate.split("T")[0]
        : "",
      status: allocation.status
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this allocation?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/hostel-allocations/${id}`);

      alert("Hostel allocation deleted successfully");

      fetchAllocations();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete hostel allocation"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Hostel Allocations</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="allocationId"
          placeholder="Allocation ID"
          value={formData.allocationId}
          onChange={handleChange}
          required
        />

        <input
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <input
          name="hostelId"
          placeholder="Hostel ID"
          value={formData.hostelId}
          onChange={handleChange}
          required
        />

        <input
          name="roomId"
          placeholder="Room ID"
          value={formData.roomId}
          onChange={handleChange}
          required
        />

        <input
          name="allocationDate"
          type="date"
          value={formData.allocationDate}
          onChange={handleChange}
          required
        />

        <input
          name="vacateDate"
          type="date"
          value={formData.vacateDate}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Vacated">Vacated</option>
        </select>

        <button type="submit">
          {editingAllocation
            ? "Update Allocation"
            : "Add Allocation"}
        </button>
      </form>

      <hr />

      <h3>Hostel Allocation Records</h3>

      {allocations.length === 0 ? (
        <p>No hostel allocations found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Allocation ID</th>
              <th>Student ID</th>
              <th>Hostel ID</th>
              <th>Room ID</th>
              <th>Allocation Date</th>
              <th>Vacate Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {allocations.map((allocation) => (
              <tr key={allocation._id}>
                <td>{allocation.allocationId}</td>
                <td>{allocation.studentId}</td>
                <td>{allocation.hostelId}</td>
                <td>{allocation.roomId}</td>
                <td>
                  {allocation.allocationDate
                    ? allocation.allocationDate.split("T")[0]
                    : ""}
                </td>
                <td>
                  {allocation.vacateDate
                    ? allocation.vacateDate.split("T")[0]
                    : ""}
                </td>
                <td>{allocation.status}</td>

                <td>
                  <button
                    onClick={() => handleEdit(allocation)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(allocation._id)
                    }
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

export default HostelAllocations;