import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  roomId: "",
  hostelId: "",
  roomNumber: "",
  floor: "",
  roomType: "Single",
  capacity: "",
  occupied: 0,
  status: "Available",
};

const HostelRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchRooms = async () => {
    try {
      const response = await api.get("/hostel-rooms");
      setRooms(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch hostel rooms:",
        error
      );
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingRoom(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        floor: Number(formData.floor),
        capacity: Number(formData.capacity),
        occupied: Number(formData.occupied),
      };

      if (editingRoom) {
        await api.put(
          `/hostel-rooms/${editingRoom._id}`,
          data
        );

        alert("Hostel room updated successfully");
      } else {
        await api.post("/hostel-rooms", data);
        alert("Hostel room added successfully");
      }

      resetForm();
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
      status: room.status,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this room?"
      )
    ) {
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
    <main className="dashboard hostel-rooms-page">
      <div className="hostel-rooms-container">

        <div className="hostel-rooms-header">
          <div>
            <h2>Hostel Rooms</h2>
            <p>
              Manage hostel rooms, capacity, occupancy,
              room types, and availability.
            </p>
          </div>

          <div className="hostel-rooms-count">
            <strong>{rooms.length}</strong>
            <span>Total Rooms</span>
          </div>
        </div>

        <div className="hostel-room-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingRoom
                  ? "Edit Room"
                  : "Add Room"}
              </h3>

              <p>
                {editingRoom
                  ? "Update the room details below."
                  : "Enter the details to create a new hostel room."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="hostel-room-form-grid">

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
                <label htmlFor="roomNumber">
                  Room Number
                </label>

                <input
                  id="roomNumber"
                  name="roomNumber"
                  placeholder="Enter room number"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="floor">
                  Floor
                </label>

                <input
                  id="floor"
                  name="floor"
                  type="number"
                  min="0"
                  placeholder="Enter floor"
                  value={formData.floor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="roomType">
                  Room Type
                </label>

                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                  <option value="Dormitory">
                    Dormitory
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="capacity">
                  Capacity
                </label>

                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  placeholder="Enter capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="occupied">
                  Occupied
                </label>

                <input
                  id="occupied"
                  name="occupied"
                  type="number"
                  min="0"
                  placeholder="Enter occupied count"
                  value={formData.occupied}
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
                  <option value="Available">
                    Available
                  </option>
                  <option value="Full">Full</option>
                  <option value="Maintenance">
                    Maintenance
                  </option>
                </select>
              </div>

            </div>

            <div className="hostel-room-form-actions">

              {editingRoom && (
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
                {editingRoom
                  ? "Update Room"
                  : "Add Room"}
              </button>

            </div>

          </form>
        </div>

        <div className="hostel-room-records-card">

          <div className="section-header">
            <div>
              <h3>Hostel Room Records</h3>
              <p>
                View and manage all hostel rooms.
              </p>
            </div>
          </div>

          {rooms.length === 0 ? (
            <div className="hostel-room-empty-state">
              <h4>No hostel rooms found</h4>
              <p>
                Add your first room using the form above.
              </p>
            </div>
          ) : (
            <div className="hostel-room-table-wrapper">

              <table className="hostel-room-table">

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

                      <td className="room-id">
                        {room.roomId}
                      </td>

                      <td className="room-hostel-id">
                        {room.hostelId}
                      </td>

                      <td className="room-number">
                        {room.roomNumber}
                      </td>

                      <td>{room.floor}</td>

                      <td>
                        <span className="room-type-badge">
                          {room.roomType}
                        </span>
                      </td>

                      <td>
                        <span className="room-capacity-badge">
                          {room.capacity}
                        </span>
                      </td>

                      <td>{room.occupied}</td>

                      <td>
                        <span
                          className={`room-status-badge room-${room.status?.toLowerCase()}`}
                        >
                          {room.status}
                        </span>
                      </td>

                      <td>
                        <div className="room-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(room)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(room._id)
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

export default HostelRooms;