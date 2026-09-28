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
    status: "Draft",
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
      [e.target.name]: e.target.value,
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
      status: "Draft",
    });

    setEditingAnnouncement(null);
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
          : undefined,
      };

      if (editingAnnouncement) {
        await api.put(
          `/announcements/${editingAnnouncement._id}`,
          data
        );

        alert("Announcement updated successfully");
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
      status: announcement.status,
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
    <main className="dashboard announcements-page">
      <div className="announcements-container">

        {/* Header */}
        <div className="announcements-header">
          <div>
            <h2>Announcements</h2>
            <p>
              Create and manage announcements for students,
              faculty, and staff.
            </p>
          </div>

          <div className="announcement-count">
            <strong>{announcements.length}</strong>
            <span>Total Announcements</span>
          </div>
        </div>

        {/* Form */}
        <div className="announcement-form-card">
          <div className="section-header">
            <div>
              <h3>
                {editingAnnouncement
                  ? "Edit Announcement"
                  : "Create Announcement"}
              </h3>

              <p>
                {editingAnnouncement
                  ? "Update the announcement details below."
                  : "Enter the details to create a new announcement."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="announcement-form-grid">

              <div className="form-group">
                <label htmlFor="announcementId">
                  Announcement ID
                </label>

                <input
                  id="announcementId"
                  name="announcementId"
                  placeholder="Enter announcement ID"
                  value={formData.announcementId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>

                <input
                  id="title"
                  name="title"
                  placeholder="Enter announcement title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="message">Message</label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter announcement message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="postedBy">Posted By</label>

                <input
                  id="postedBy"
                  name="postedBy"
                  placeholder="Enter poster name"
                  value={formData.postedBy}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetAudience">
                  Target Audience
                </label>

                <select
                  id="targetAudience"
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
              </div>

              <div className="form-group">
                <label htmlFor="publishDate">
                  Publish Date
                </label>

                <input
                  id="publishDate"
                  name="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="expiryDate">
                  Expiry Date
                </label>

                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>

            <div className="announcement-form-actions">
              {editingAnnouncement && (
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
                {editingAnnouncement
                  ? "Update Announcement"
                  : "Add Announcement"}
              </button>
            </div>
          </form>
        </div>

        {/* Records */}
        <div className="announcement-records-card">

          <div className="section-header">
            <div>
              <h3>Announcement Records</h3>
              <p>
                View and manage all announcements.
              </p>
            </div>
          </div>

          {announcements.length === 0 ? (
            <div className="announcement-empty-state">
              <h4>No announcements found</h4>
              <p>
                Create your first announcement using the form above.
              </p>
            </div>
          ) : (
            <div className="announcement-table-wrapper">
              <table className="announcement-table">
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

                      <td>
                        {announcement.announcementId}
                      </td>

                      <td className="announcement-title">
                        {announcement.title}
                      </td>

                      <td className="announcement-message">
                        {announcement.message}
                      </td>

                      <td>
                        {announcement.postedBy}
                      </td>

                      <td>
                        <span className="audience-badge">
                          {announcement.targetAudience}
                        </span>
                      </td>

                      <td>
                        {announcement.publishDate
                          ? announcement.publishDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        {announcement.expiryDate
                          ? announcement.expiryDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <span
                          className={`status-badge status-${announcement.status.toLowerCase()}`}
                        >
                          {announcement.status}
                        </span>
                      </td>

                      <td>
                        <div className="announcement-actions">
                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(announcement)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                announcement._id
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

export default Announcements;