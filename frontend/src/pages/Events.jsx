import { useEffect, useState } from "react";
import api from "../api/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    eventId: "",
    title: "",
    description: "",
    eventType: "Seminar",
    venue: "",
    startDate: "",
    endDate: "",
    organizerId: "",
    status: "Upcoming"
  });

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      eventId: "",
      title: "",
      description: "",
      eventType: "Seminar",
      venue: "",
      startDate: "",
      endDate: "",
      organizerId: "",
      status: "Upcoming"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate)
      };

      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, data);
        alert("Event updated successfully");
        setEditingEvent(null);
      } else {
        await api.post("/events", data);
        alert("Event added successfully");
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save event"
      );
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);

    setFormData({
      eventId: event.eventId,
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      venue: event.venue,
      startDate: event.startDate
        ? event.startDate.split("T")[0]
        : "",
      endDate: event.endDate
        ? event.endDate.split("T")[0]
        : "",
      organizerId: event.organizerId,
      status: event.status
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await api.delete(`/events/${id}`);
      alert("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete event"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Events</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="eventId"
          placeholder="Event ID"
          value={formData.eventId}
          onChange={handleChange}
          required
        />

        <input
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
        >
          <option value="Seminar">Seminar</option>
          <option value="Workshop">Workshop</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="venue"
          placeholder="Venue"
          value={formData.venue}
          onChange={handleChange}
          required
        />

        <input
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <input
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <input
          name="organizerId"
          placeholder="Organizer ID"
          value={formData.organizerId}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit">
          {editingEvent ? "Update Event" : "Add Event"}
        </button>
      </form>

      <hr />

      <h3>Event Records</h3>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Venue</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Organizer ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.eventId}</td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.eventType}</td>
                <td>{event.venue}</td>
                <td>
                  {event.startDate
                    ? event.startDate.split("T")[0]
                    : ""}
                </td>
                <td>
                  {event.endDate
                    ? event.endDate.split("T")[0]
                    : ""}
                </td>
                <td>{event.organizerId}</td>
                <td>{event.status}</td>

                <td>
                  <button onClick={() => handleEdit(event)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(event._id)}>
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

export default Events;