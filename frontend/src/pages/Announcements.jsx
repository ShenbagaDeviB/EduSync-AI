import { useEffect, useState } from "react";
import api from "../api/api";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const [formData, setFormData] = useState({
    announcementId: "",
    title: "",
    message: "",
    postedBy: "",
    targetAudience: "All",
    publishDate: "",
    expiryDate: "",
    status: "Draft"
  });

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get("/announcements");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      announcementId: "",
      title: "",
      message: "",
      postedBy: "",
      targetAudience: "All",
      publishDate: "",
      expiryDate: "",
      status: "Draft"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        publishDate: formData.publishDate
          ? new Date(formData.publishDate)
          : undefined,
        expiryDate: formData.expiryDate
          ? new Date(formData.expiryDate)
          : undefined
      };

      if (editingAnnouncement) {
        await api.put(
          `/announcements/${editingAnnouncement._id}`,
          data
        );

        alert("Announcement updated successfully");
        setEditingAnnouncement(null);
      } else {
        await api.post("/announcements", data);
        alert("Announcement added successfully");
      }

      resetForm();
      fetchAnnouncements();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save announcement"
      );
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);

    setFormData({
      announcementId: announcement.announcementId,
      title: announcement.title,
      message: announcement.message,
      postedBy: announcement.postedBy,
      targetAudience: announcement.targetAudience,
      publishDate: announcement.publishDate
        ? announcement.publishDate.split("T")[0]
        : "",
      expiryDate: announcement.expiryDate
        ? announcement.expiryDate.split("T")[0]
        : "",
      status: announcement.status
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this announcement?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/announcements/${id}`);

      alert("Announcement deleted successfully");

      fetchAnnouncements();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete announcement"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Announcements</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="announcementId"
          placeholder="Announcement ID"
          value={formData.announcementId}
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

        <input
          name="postedBy"
          placeholder="Posted By"
          value={formData.postedBy}
          onChange={handleChange}
          required
        />

        <select
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          required
        >
          <option value="All">All</option>
          <option value="Students">Students</option>
          <option value="Faculty">Faculty</option>
          <option value="Staff">Staff</option>
        </select>

        <input
          name="publishDate"
          type="date"
          value={formData.publishDate}
          onChange={handleChange}
        />

        <input
          name="expiryDate"
          type="date"
          value={formData.expiryDate}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Expired">Expired</option>
        </select>

        <button type="submit">
          {editingAnnouncement
            ? "Update Announcement"
            : "Add Announcement"}
        </button>
      </form>

      <hr />

      <h3>Announcement Records</h3>

      {announcements.length === 0 ? (
        <p>No announcements found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Announcement ID</th>
              <th>Title</th>
              <th>Message</th>
              <th>Posted By</th>
              <th>Audience</th>
              <th>Publish Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement._id}>
                <td>{announcement.announcementId}</td>
                <td>{announcement.title}</td>
                <td>{announcement.message}</td>
                <td>{announcement.postedBy}</td>
                <td>{announcement.targetAudience}</td>
                <td>
                  {announcement.publishDate
                    ? announcement.publishDate.split("T")[0]
                    : ""}
                </td>
                <td>
                  {announcement.expiryDate
                    ? announcement.expiryDate.split("T")[0]
                    : ""}
                </td>
                <td>{announcement.status}</td>

                <td>
                  <button
                    onClick={() =>
                      handleEdit(announcement)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(announcement._id)
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

export default Announcements;