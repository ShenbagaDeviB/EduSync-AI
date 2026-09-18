import { useEffect, useState } from "react";
import api from "../api/api";

const Hostel = () => {
  const [hostels, setHostels] = useState([]);
  const [editingHostel, setEditingHostel] = useState(null);

  const [formData, setFormData] = useState({
    hostelId: "",
    hostelName: "",
    hostelType: "Boys",
    address: "",
    totalRooms: "",
    totalCapacity: "",
    wardenName: "",
    contactNumber: "",
    status: "Active"
  });

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
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        totalRooms: Number(formData.totalRooms),
        totalCapacity: Number(formData.totalCapacity)
      };

      if (editingHostel) {
        await api.put(`/hostels/${editingHostel._id}`, data);
        alert("Hostel updated successfully");
        setEditingHostel(null);
      } else {
        await api.post("/hostels", data);
        alert("Hostel added successfully");
      }

      setFormData({
        hostelId: "",
        hostelName: "",
        hostelType: "Boys",
        address: "",
        totalRooms: "",
        totalCapacity: "",
        wardenName: "",
        contactNumber: "",
        status: "Active"
      });

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
      status: hostel.status
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hostel?")) {
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
    <main className="dashboard">
      <h2>Hostels</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="hostelId"
          placeholder="Hostel ID"
          value={formData.hostelId}
          onChange={handleChange}
          required
        />

        <input
          name="hostelName"
          placeholder="Hostel Name"
          value={formData.hostelName}
          onChange={handleChange}
          required
        />

        <select
          name="hostelType"
          value={formData.hostelType}
          onChange={handleChange}
          required
        >
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
        </select>

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          name="totalRooms"
          type="number"
          placeholder="Total Rooms"
          value={formData.totalRooms}
          onChange={handleChange}
          required
        />

        <input
          name="totalCapacity"
          type="number"
          placeholder="Total Capacity"
          value={formData.totalCapacity}
          onChange={handleChange}
          required
        />

        <input
          name="wardenName"
          placeholder="Warden Name"
          value={formData.wardenName}
          onChange={handleChange}
          required
        />

        <input
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">
          {editingHostel ? "Update Hostel" : "Add Hostel"}
        </button>
      </form>

      <hr />

      <h3>Hostel Records</h3>

      {hostels.length === 0 ? (
        <p>No hostels found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Hostel ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Address</th>
              <th>Total Rooms</th>
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
                <td>{hostel.hostelId}</td>
                <td>{hostel.hostelName}</td>
                <td>{hostel.hostelType}</td>
                <td>{hostel.address}</td>
                <td>{hostel.totalRooms}</td>
                <td>{hostel.totalCapacity}</td>
                <td>{hostel.wardenName}</td>
                <td>{hostel.contactNumber}</td>
                <td>{hostel.status}</td>

                <td>
                  <button onClick={() => handleEdit(hostel)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(hostel._id)}>
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

export default Hostel;