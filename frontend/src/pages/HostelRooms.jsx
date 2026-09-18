import { useEffect, useState } from "react";
import api from "../api/api";

const HostelRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  const [formData, setFormData] = useState({
    roomId: "",
    hostelId: "",
    roomNumber: "",
    floor: "",
    roomType: "Single",
    capacity: "",
    occupied: 0,
    status: "Available"
  });

  const fetchRooms = async () => {
    try {
      const response = await api.get("/hostel-rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Failed to fetch hostel rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
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
        floor: Number(formData.floor),
        capacity: Number(formData.capacity),
        occupied: Number(formData.occupied)
      };

      if (editingRoom) {
        await api.put(`/hostel-rooms/${editingRoom._id}`, data);
        alert("Hostel room updated successfully");
        setEditingRoom(null);
      } else {
        await api.post("/hostel-rooms", data);
        alert("Hostel room added successfully");
      }

      setFormData({
        roomId: "",
        hostelId: "",
        roomNumber: "",
        floor: "",
        roomType: "Single",
        capacity: "",
        occupied: 0,
        status: "Available"
      });

      fetchRooms();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save hostel room"
      );
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);

    setFormData({
      roomId: room.roomId,
      hostelId: room.hostelId,
      roomNumber: room.roomNumber,
      floor: room.floor,
      roomType: room.roomType,
      capacity: room.capacity,
      occupied: room.occupied,
      status: room.status
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) {
      return;
    }

    try {
      await api.delete(`/hostel-rooms/${id}`);

      alert("Hostel room deleted successfully");

      fetchRooms();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete hostel room"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Hostel Rooms</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="roomId"
          placeholder="Room ID"
          value={formData.roomId}
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
          name="roomNumber"
          placeholder="Room Number"
          value={formData.roomNumber}
          onChange={handleChange}
          required
        />

        <input
          name="floor"
          type="number"
          placeholder="Floor"
          value={formData.floor}
          onChange={handleChange}
          required
        />

        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          required
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
          <option value="Dormitory">Dormitory</option>
        </select>

        <input
          name="capacity"
          type="number"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />

        <input
          name="occupied"
          type="number"
          placeholder="Occupied"
          value={formData.occupied}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Available">Available</option>
          <option value="Full">Full</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <button type="submit">
          {editingRoom ? "Update Room" : "Add Room"}
        </button>
      </form>

      <hr />

      <h3>Hostel Room Records</h3>

      {rooms.length === 0 ? (
        <p>No hostel rooms found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Hostel ID</th>
              <th>Room Number</th>
              <th>Floor</th>
              <th>Room Type</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.roomId}</td>
                <td>{room.hostelId}</td>
                <td>{room.roomNumber}</td>
                <td>{room.floor}</td>
                <td>{room.roomType}</td>
                <td>{room.capacity}</td>
                <td>{room.occupied}</td>
                <td>{room.status}</td>

                <td>
                  <button onClick={() => handleEdit(room)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(room._id)}>
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

export default HostelRooms;