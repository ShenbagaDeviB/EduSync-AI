import { useEffect, useState } from "react";
import api from "../api/api";

const EventRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [editingRegistration, setEditingRegistration] = useState(null);

  const [formData, setFormData] = useState({
    registrationId: "",
    eventId: "",
    participantId: "",
    participantType: "Student",
    registrationDate: "",
    status: "Registered"
  });

  const fetchRegistrations = async () => {
    try {
      const response = await api.get("/event-registrations");
      setRegistrations(response.data);
    } catch (error) {
      console.error("Failed to fetch event registrations:", error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      registrationId: "",
      eventId: "",
      participantId: "",
      participantType: "Student",
      registrationDate: "",
      status: "Registered"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        registrationDate: formData.registrationDate
          ? new Date(formData.registrationDate)
          : undefined
      };

      if (editingRegistration) {
        await api.put(
          `/event-registrations/${editingRegistration._id}`,
          data
        );

        alert("Event registration updated successfully");
        setEditingRegistration(null);
      } else {
        await api.post("/event-registrations", data);
        alert("Event registration added successfully");
      }

      resetForm();
      fetchRegistrations();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save event registration"
      );
    }
  };

  const handleEdit = (registration) => {
    setEditingRegistration(registration);

    setFormData({
      registrationId: registration.registrationId,
      eventId: registration.eventId,
      participantId: registration.participantId,
      participantType: registration.participantType,
      registrationDate: registration.registrationDate
        ? registration.registrationDate.split("T")[0]
        : "",
      status: registration.status
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this registration?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/event-registrations/${id}`);

      alert("Event registration deleted successfully");

      fetchRegistrations();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete event registration"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Event Registrations</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="registrationId"
          placeholder="Registration ID"
          value={formData.registrationId}
          onChange={handleChange}
          required
        />

        <input
          name="eventId"
          placeholder="Event ID"
          value={formData.eventId}
          onChange={handleChange}
          required
        />

        <input
          name="participantId"
          placeholder="Participant ID"
          value={formData.participantId}
          onChange={handleChange}
          required
        />

        <select
          name="participantType"
          value={formData.participantType}
          onChange={handleChange}
          required
        >
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Staff">Staff</option>
        </select>

        <input
          name="registrationDate"
          type="date"
          value={formData.registrationDate}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Registered">Registered</option>
          <option value="Attended">Attended</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit">
          {editingRegistration
            ? "Update Registration"
            : "Add Registration"}
        </button>
      </form>

      <hr />

      <h3>Event Registration Records</h3>

      {registrations.length === 0 ? (
        <p>No event registrations found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Registration ID</th>
              <th>Event ID</th>
              <th>Participant ID</th>
              <th>Participant Type</th>
              <th>Registration Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((registration) => (
              <tr key={registration._id}>
                <td>{registration.registrationId}</td>
                <td>{registration.eventId}</td>
                <td>{registration.participantId}</td>
                <td>{registration.participantType}</td>
                <td>
                  {registration.registrationDate
                    ? registration.registrationDate.split("T")[0]
                    : ""}
                </td>
                <td>{registration.status}</td>

                <td>
                  <button
                    onClick={() => handleEdit(registration)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(registration._id)
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

export default EventRegistrations;