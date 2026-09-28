import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  registrationId: "",
  eventId: "",
  participantId: "",
  participantType: "Student",
  registrationDate: "",
  status: "Registered",
};

const EventRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [formData, setFormData] = useState(initialForm);

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
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingRegistration(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        registrationDate: formData.registrationDate
          ? new Date(formData.registrationDate)
          : undefined,
      };

      if (editingRegistration) {
        await api.put(
          `/event-registrations/${editingRegistration._id}`,
          data
        );

        alert("Event registration updated successfully");
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
      status: registration.status,
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
    <main className="dashboard event-registrations-page">
      <div className="event-registrations-container">

        <div className="event-registrations-header">
          <div>
            <h2>Event Registrations</h2>
            <p>
              Manage student, faculty, and staff event registrations.
            </p>
          </div>

          <div className="event-registrations-count">
            <strong>{registrations.length}</strong>
            <span>Total Registrations</span>
          </div>
        </div>

        <div className="event-registration-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingRegistration
                  ? "Edit Registration"
                  : "Add Registration"}
              </h3>

              <p>
                {editingRegistration
                  ? "Update the registration details below."
                  : "Enter the details to register a participant."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="event-registration-form-grid">

              <div className="form-group">
                <label htmlFor="registrationId">
                  Registration ID
                </label>

                <input
                  id="registrationId"
                  name="registrationId"
                  placeholder="Enter registration ID"
                  value={formData.registrationId}
                  onChange={handleChange}
                  required
                />
              </div>

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
                <label htmlFor="participantId">
                  Participant ID
                </label>

                <input
                  id="participantId"
                  name="participantId"
                  placeholder="Enter participant ID"
                  value={formData.participantId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="participantType">
                  Participant Type
                </label>

                <select
                  id="participantType"
                  name="participantType"
                  value={formData.participantType}
                  onChange={handleChange}
                  required
                >
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="registrationDate">
                  Registration Date
                </label>

                <input
                  id="registrationDate"
                  name="registrationDate"
                  type="date"
                  value={formData.registrationDate}
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
                  <option value="Registered">Registered</option>
                  <option value="Attended">Attended</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

            </div>

            <div className="event-registration-form-actions">

              {editingRegistration && (
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
                {editingRegistration
                  ? "Update Registration"
                  : "Add Registration"}
              </button>

            </div>

          </form>
        </div>

        <div className="event-registration-records-card">

          <div className="section-header">
            <div>
              <h3>Event Registration Records</h3>
              <p>
                View and manage all event registrations.
              </p>
            </div>
          </div>

          {registrations.length === 0 ? (
            <div className="event-registration-empty-state">
              <h4>No event registrations found</h4>
              <p>
                Add your first registration using the form above.
              </p>
            </div>
          ) : (
            <div className="event-registration-table-wrapper">

              <table className="event-registration-table">

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

                      <td className="event-registration-id">
                        {registration.registrationId}
                      </td>

                      <td>{registration.eventId}</td>

                      <td>{registration.participantId}</td>

                      <td>
                        <span className="participant-type-badge">
                          {registration.participantType}
                        </span>
                      </td>

                      <td>
                        {registration.registrationDate
                          ? registration.registrationDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <span
                          className={`event-registration-status-badge ${
                            registration.status === "Registered"
                              ? "registration-registered"
                              : registration.status === "Attended"
                              ? "registration-attended"
                              : "registration-cancelled"
                          }`}
                        >
                          {registration.status}
                        </span>
                      </td>

                      <td>
                        <div className="event-registration-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(registration)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(registration._id)
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

export default EventRegistrations;