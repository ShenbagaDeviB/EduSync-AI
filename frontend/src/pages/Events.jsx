import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  eventId: "",
  title: "",
  description: "",
  eventType: "Seminar",
  venue: "",
  startDate: "",
  endDate: "",
  organizerId: "",
  status: "Upcoming",
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState(initialForm);

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
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingEvent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      };

      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, data);
        alert("Event updated successfully");
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
      status: event.status,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this event?"
      )
    ) {
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
    <main className="dashboard events-page">
      <div className="events-container">

        <div className="events-header">
          <div>
            <h2>Events</h2>
            <p>
              Plan and manage seminars, workshops, cultural and sports events.
            </p>
          </div>

          <div className="events-count">
            <strong>{events.length}</strong>
            <span>Total Events</span>
          </div>
        </div>

        <div className="event-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingEvent
                  ? "Edit Event"
                  : "Add Event"}
              </h3>

              <p>
                {editingEvent
                  ? "Update the event details below."
                  : "Enter the details to create a new event."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="event-form-grid">

              <div className="form-group">
                <label htmlFor="eventId">
                  Event ID
                </label>

                <input
                  id="eventId"
                  name="eventId"
                  placeholder="Enter event ID"
                  value={formData.eventId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">
                  Event Title
                </label>

                <input
                  id="title"
                  name="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group event-description-group">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventType">
                  Event Type
                </label>

                <select
                  id="eventType"
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
              </div>

              <div className="form-group">
                <label htmlFor="venue">
                  Venue
                </label>

                <input
                  id="venue"
                  name="venue"
                  placeholder="Enter venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="startDate">
                  Start Date
                </label>

                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">
                  End Date
                </label>

                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="organizerId">
                  Organizer ID
                </label>

                <input
                  id="organizerId"
                  name="organizerId"
                  placeholder="Enter organizer ID"
                  value={formData.organizerId}
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
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

            </div>

            <div className="event-form-actions">

              {editingEvent && (
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
                {editingEvent
                  ? "Update Event"
                  : "Add Event"}
              </button>

            </div>

          </form>
        </div>

        <div className="event-records-card">

          <div className="section-header">
            <div>
              <h3>Event Records</h3>
              <p>
                View and manage all institutional events.
              </p>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="event-empty-state">
              <h4>No events found</h4>
              <p>
                Add your first event using the form above.
              </p>
            </div>
          ) : (
            <div className="event-table-wrapper">

              <table className="event-table">

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

                      <td className="event-id">
                        {event.eventId}
                      </td>

                      <td className="event-title">
                        {event.title}
                      </td>

                      <td className="event-description">
                        {event.description}
                      </td>

                      <td>
                        <span className="event-type-badge">
                          {event.eventType}
                        </span>
                      </td>

                      <td>{event.venue}</td>

                      <td>
                        {event.startDate
                          ? event.startDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        {event.endDate
                          ? event.endDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>{event.organizerId}</td>

                      <td>
                        <span
                          className={`event-status-badge ${
                            event.status === "Upcoming"
                              ? "event-upcoming"
                              : event.status === "Ongoing"
                              ? "event-ongoing"
                              : event.status === "Completed"
                              ? "event-completed"
                              : "event-cancelled"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>

                      <td>
                        <div className="event-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(event)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(event._id)
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

export default Events;