import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  hostelId: "",
  hostelName: "",
  hostelType: "Boys",
  address: "",
  totalRooms: "",
  totalCapacity: "",
  wardenName: "",
  contactNumber: "",
  status: "Active",
};

const Hostel = () => {
  const [hostels, setHostels] = useState([]);
  const [editingHostel, setEditingHostel] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchHostels = async () => {
    try {
      const response = await api.get("/hostels");
      setHostels(response.data);
    } catch (error) {
      console.error("Failed to fetch hostels:", error);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingHostel(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        totalRooms: Number(formData.totalRooms),
        totalCapacity: Number(formData.totalCapacity),
      };

      if (editingHostel) {
        await api.put(
          `/hostels/${editingHostel._id}`,
          data
        );

        alert("Hostel updated successfully");
      } else {
        await api.post("/hostels", data);
        alert("Hostel added successfully");
      }

      resetForm();
      fetchHostels();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save hostel"
      );
    }
  };

  const handleEdit = (hostel) => {
    setEditingHostel(hostel);

    setFormData({
      hostelId: hostel.hostelId,
      hostelName: hostel.hostelName,
      hostelType: hostel.hostelType,
      address: hostel.address,
      totalRooms: hostel.totalRooms,
      totalCapacity: hostel.totalCapacity,
      wardenName: hostel.wardenName,
      contactNumber: hostel.contactNumber,
      status: hostel.status,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this hostel?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/hostels/${id}`);

      alert("Hostel deleted successfully");

      fetchHostels();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete hostel"
      );
    }
  };

  return (
    <main className="dashboard hostel-page">
      <div className="hostel-container">

        <div className="hostel-header">
          <div>
            <h2>Hostels</h2>
            <p>
              Manage hostel facilities, capacity, wardens,
              and operational status.
            </p>
          </div>

          <div className="hostel-count">
            <strong>{hostels.length}</strong>
            <span>Total Hostels</span>
          </div>
        </div>

        <div className="hostel-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingHostel
                  ? "Edit Hostel"
                  : "Add Hostel"}
              </h3>

              <p>
                {editingHostel
                  ? "Update the hostel details below."
                  : "Enter the details to create a new hostel."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="hostel-form-grid">

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
                <label htmlFor="hostelName">
                  Hostel Name
                </label>

                <input
                  id="hostelName"
                  name="hostelName"
                  placeholder="Enter hostel name"
                  value={formData.hostelName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hostelType">
                  Hostel Type
                </label>

                <select
                  id="hostelType"
                  name="hostelType"
                  value={formData.hostelType}
                  onChange={handleChange}
                  required
                >
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="wardenName">
                  Warden Name
                </label>

                <input
                  id="wardenName"
                  name="wardenName"
                  placeholder="Enter warden name"
                  value={formData.wardenName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">
                  Contact Number
                </label>

                <input
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter contact number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
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
                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="totalRooms">
                  Total Rooms
                </label>

                <input
                  id="totalRooms"
                  name="totalRooms"
                  type="number"
                  min="0"
                  placeholder="Enter total rooms"
                  value={formData.totalRooms}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="totalCapacity">
                  Total Capacity
                </label>

                <input
                  id="totalCapacity"
                  name="totalCapacity"
                  type="number"
                  min="0"
                  placeholder="Enter total capacity"
                  value={formData.totalCapacity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group hostel-address-group">
                <label htmlFor="address">
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter hostel address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="hostel-form-actions">

              {editingHostel && (
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
                {editingHostel
                  ? "Update Hostel"
                  : "Add Hostel"}
              </button>

            </div>

          </form>
        </div>

        <div className="hostel-records-card">

          <div className="section-header">
            <div>
              <h3>Hostel Records</h3>
              <p>
                View and manage all hostel facilities.
              </p>
            </div>
          </div>

          {hostels.length === 0 ? (
            <div className="hostel-empty-state">
              <h4>No hostels found</h4>
              <p>
                Add your first hostel using the form above.
              </p>
            </div>
          ) : (
            <div className="hostel-table-wrapper">

              <table className="hostel-table">

                <thead>
                  <tr>
                    <th>Hostel ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Address</th>
                    <th>Rooms</th>
                    <th>Capacity</th>
                    <th>Warden</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {hostels.map((hostel) => (
                    <tr key={hostel._id}>

                      <td className="hostel-id">
                        {hostel.hostelId}
                      </td>

                      <td className="hostel-name">
                        {hostel.hostelName}
                      </td>

                      <td>
                        <span
                          className={`hostel-type-badge hostel-${hostel.hostelType?.toLowerCase()}`}
                        >
                          {hostel.hostelType}
                        </span>
                      </td>

                      <td className="hostel-address">
                        {hostel.address}
                      </td>

                      <td>{hostel.totalRooms}</td>

                      <td>
                        <span className="hostel-capacity-badge">
                          {hostel.totalCapacity}
                        </span>
                      </td>

                      <td>{hostel.wardenName}</td>

                      <td>{hostel.contactNumber}</td>

                      <td>
                        <span
                          className={`hostel-status-badge hostel-${hostel.status?.toLowerCase()}`}
                        >
                          {hostel.status}
                        </span>
                      </td>

                      <td>
                        <div className="hostel-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(hostel)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(hostel._id)
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

export default Hostel;