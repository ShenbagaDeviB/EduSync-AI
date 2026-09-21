import { useEffect, useState } from "react";
import api from "../api/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [editingNotification, setEditingNotification] = useState(null);

  const [formData, setFormData] = useState({
    notificationId: "",
    recipientId: "",
    title: "",
    message: "",
    type: "Info",
    isRead: false
  });

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const resetForm = () => {
    setFormData({
      notificationId: "",
      recipientId: "",
      title: "",
      message: "",
      type: "Info",
      isRead: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        isRead: Boolean(formData.isRead)
      };

      if (editingNotification) {
        await api.put(
          `/notifications/${editingNotification._id}`,
          data
        );

        alert("Notification updated successfully");
        setEditingNotification(null);
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
      isRead: notification.isRead
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
    <main className="dashboard">
      <h2>Notifications</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="notificationId"
          placeholder="Notification ID"
          value={formData.notificationId}
          onChange={handleChange}
          required
        />

        <input
          name="recipientId"
          placeholder="Recipient ID"
          value={formData.recipientId}
          onChange={handleChange}
          required
        />

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <select
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

        <label>
          <input
            name="isRead"
            type="checkbox"
            checked={formData.isRead}
            onChange={handleChange}
          />
          Read
        </label>

        <button type="submit">
          {editingNotification
            ? "Update Notification"
            : "Add Notification"}
        </button>
      </form>

      <hr />

      <h3>Notification Records</h3>

      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <table>
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
                <td>{notification.notificationId}</td>
                <td>{notification.recipientId}</td>
                <td>{notification.title}</td>
                <td>{notification.message}</td>
                <td>{notification.type}</td>
                <td>
                  {notification.isRead ? "Yes" : "No"}
                </td>
                <td>
                  {notification.createdAt
                    ? notification.createdAt.split("T")[0]
                    : ""}
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleEdit(notification)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(notification._id)
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

export default Notifications;