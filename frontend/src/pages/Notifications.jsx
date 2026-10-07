import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  notificationId: "",
  recipientId: "",
  title: "",
  message: "",
  type: "Info",
  isRead: false,
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [editingNotification, setEditingNotification] =
    useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch notifications:",
        error
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingNotification(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        isRead: Boolean(formData.isRead),
      };

      if (editingNotification) {
        await api.put(
          `/notifications/${editingNotification._id}`,
          data
        );

        alert("Notification updated successfully");
      } else {
        await api.post("/notifications", data);
        alert("Notification added successfully");
      }

      resetForm();
      fetchNotifications();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save notification"
      );
    }
  };

  const handleEdit = (notification) => {
    setEditingNotification(notification);

    setFormData({
      notificationId: notification.notificationId,
      recipientId: notification.recipientId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isRead: notification.isRead,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this notification?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/notifications/${id}`);

      alert("Notification deleted successfully");

      fetchNotifications();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete notification"
      );
    }
  };

  return (
    <main className="dashboard notifications-page">
      <div className="notifications-container">

        <div className="notifications-header">
          <div>
            <h2>Notifications</h2>
            <p>
              Manage notifications, messages, and
              recipient updates.
            </p>
          </div>

          <div className="notifications-count">
            <strong>{notifications.length}</strong>
            <span>Total Notifications</span>
          </div>
        </div>

        <div className="notification-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingNotification
                  ? "Edit Notification"
                  : "Add Notification"}
              </h3>

              <p>
                {editingNotification
                  ? "Update the notification details below."
                  : "Enter the details to create a new notification."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="notification-form-grid">

              <div className="form-group">
                <label htmlFor="notificationId">
                  Notification ID
                </label>

                <input
                  id="notificationId"
                  name="notificationId"
                  placeholder="Enter notification ID"
                  value={formData.notificationId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="recipientId">
                  Recipient ID
                </label>

                <input
                  id="recipientId"
                  name="recipientId"
                  placeholder="Enter recipient ID"
                  value={formData.recipientId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">
                  Title
                </label>

                <input
                  id="title"
                  name="title"
                  placeholder="Enter notification title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">
                  Notification Type
                </label>

                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="Info">Info</option>
                  <option value="Success">Success</option>
                  <option value="Warning">Warning</option>
                  <option value="Alert">Alert</option>
                </select>
              </div>

              <div className="form-group notification-message-group">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter notification message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="notification-read-group">
                <label className="notification-checkbox">
                  <input
                    name="isRead"
                    type="checkbox"
                    checked={formData.isRead}
                    onChange={handleChange}
                  />

                  <span>
                    Mark as Read
                  </span>
                </label>
              </div>

            </div>

            <div className="notification-form-actions">

              {editingNotification && (
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
                {editingNotification
                  ? "Update Notification"
                  : "Add Notification"}
              </button>

            </div>

          </form>
        </div>

        <div className="notification-records-card">

          <div className="section-header">
            <div>
              <h3>Notification Records</h3>
              <p>
                View and manage all notification records.
              </p>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="notification-empty-state">
              <h4>No notifications found</h4>
              <p>
                Add your first notification using the form above.
              </p>
            </div>
          ) : (
            <div className="notification-table-wrapper">

              <table className="notification-table">

                <thead>
                  <tr>
                    <th>Notification ID</th>
                    <th>Recipient ID</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Type</th>
                    <th>Read</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {notifications.map((notification) => (
                    <tr key={notification._id}>

                      <td className="notification-id">
                        {notification.notificationId}
                      </td>

                      <td className="notification-recipient">
                        {notification.recipientId}
                      </td>

                      <td className="notification-title">
                        {notification.title}
                      </td>

                      <td className="notification-message">
                        {notification.message}
                      </td>

                      <td>
                        <span
                          className={`notification-type-badge notification-${notification.type?.toLowerCase()}`}
                        >
                          {notification.type}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`notification-read-badge ${
                            notification.isRead
                              ? "notification-read"
                              : "notification-unread"
                          }`}
                        >
                          {notification.isRead
                            ? "Read"
                            : "Unread"}
                        </span>
                      </td>

                      <td>
                        {notification.createdAt
                          ? notification.createdAt.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <div className="notification-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(notification)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                notification._id
                              )
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

export default Notifications;