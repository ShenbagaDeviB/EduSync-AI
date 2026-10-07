import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  allocationId: "",
  studentId: "",
  hostelId: "",
  roomId: "",
  allocationDate: "",
  vacateDate: "",
  status: "Active",
};

const HostelAllocations = () => {
  const [allocations, setAllocations] = useState([]);
  const [editingAllocation, setEditingAllocation] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchAllocations = async () => {
    try {
      const response = await api.get("/hostel-allocations");
      setAllocations(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch hostel allocations:",
        error
      );
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingAllocation(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        allocationDate: new Date(formData.allocationDate),
        vacateDate: formData.vacateDate
          ? new Date(formData.vacateDate)
          : undefined,
      };

      if (editingAllocation) {
        await api.put(
          `/hostel-allocations/${editingAllocation._id}`,
          data
        );

        alert("Hostel allocation updated successfully");
      } else {
        await api.post("/hostel-allocations", data);
        alert("Hostel allocation added successfully");
      }

      resetForm();
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
      status: allocation.status,
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
    <main className="dashboard hostel-allocations-page">
      <div className="hostel-allocations-container">

        <div className="hostel-allocations-header">
          <div>
            <h2>Hostel Allocations</h2>
            <p>
              Manage student hostel and room allocations,
              including allocation and vacating details.
            </p>
          </div>

          <div className="hostel-allocations-count">
            <strong>{allocations.length}</strong>
            <span>Total Allocations</span>
          </div>
        </div>

        <div className="hostel-allocation-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingAllocation
                  ? "Edit Allocation"
                  : "Add Allocation"}
              </h3>

              <p>
                {editingAllocation
                  ? "Update the allocation details below."
                  : "Enter the details to create a new hostel allocation."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="hostel-allocation-form-grid">

              <div className="form-group">
                <label htmlFor="allocationId">
                  Allocation ID
                </label>

                <input
                  id="allocationId"
                  name="allocationId"
                  placeholder="Enter allocation ID"
                  value={formData.allocationId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="studentId">
                  Student ID
                </label>

                <input
                  id="studentId"
                  name="studentId"
                  placeholder="Enter student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hostelId">
                  Hostel ID
                </label>

                <input
                  id="hostelId"
                  name="hostelId"
                  placeholder="Enter hostel ID"
                  value={formData.hostelId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="roomId">
                  Room ID
                </label>

                <input
                  id="roomId"
                  name="roomId"
                  placeholder="Enter room ID"
                  value={formData.roomId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="allocationDate">
                  Allocation Date
                </label>

                <input
                  id="allocationDate"
                  name="allocationDate"
                  type="date"
                  value={formData.allocationDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="vacateDate">
                  Vacate Date
                </label>

                <input
                  id="vacateDate"
                  name="vacateDate"
                  type="date"
                  value={formData.vacateDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Vacated">Vacated</option>
                </select>
              </div>

            </div>

            <div className="hostel-allocation-form-actions">

              {editingAllocation && (
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
                {editingAllocation
                  ? "Update Allocation"
                  : "Add Allocation"}
              </button>

            </div>

          </form>
        </div>

        <div className="hostel-allocation-records-card">

          <div className="section-header">
            <div>
              <h3>Hostel Allocation Records</h3>
              <p>
                View and manage all student hostel allocations.
              </p>
            </div>
          </div>

          {allocations.length === 0 ? (
            <div className="hostel-allocation-empty-state">
              <h4>No hostel allocations found</h4>
              <p>
                Add your first allocation using the form above.
              </p>
            </div>
          ) : (
            <div className="hostel-allocation-table-wrapper">

              <table className="hostel-allocation-table">

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

                      <td className="allocation-id">
                        {allocation.allocationId}
                      </td>

                      <td className="allocation-student-id">
                        {allocation.studentId}
                      </td>

                      <td>
                        {allocation.hostelId}
                      </td>

                      <td>
                        {allocation.roomId}
                      </td>

                      <td>
                        {allocation.allocationDate
                          ? allocation.allocationDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        {allocation.vacateDate
                          ? allocation.vacateDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <span
                          className={`allocation-status-badge allocation-${allocation.status?.toLowerCase()}`}
                        >
                          {allocation.status}
                        </span>
                      </td>

                      <td>
                        <div className="allocation-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(allocation)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(allocation._id)
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

export default HostelAllocations;