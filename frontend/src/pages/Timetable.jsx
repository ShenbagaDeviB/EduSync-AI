import { useEffect, useState } from "react";
import api from "../api/api";

const initialFormData = {
  timetableId: "",
  courseId: "",
  subjectId: "",
  facultyId: "",
  day: "Monday",
  startTime: "",
  endTime: "",
  room: "",
};

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [editingTimetable, setEditingTimetable] =
    useState(null);

  const [formData, setFormData] =
    useState(initialFormData);

  const fetchTimetables = async () => {
    try {
      const response = await api.get("/timetables");
      setTimetables(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch timetables:",
        error
      );
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingTimetable(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTimetable) {
        await api.put(
          `/timetables/${editingTimetable._id}`,
          formData
        );

        alert("Timetable updated successfully");
      } else {
        await api.post("/timetables", formData);

        alert("Timetable added successfully");
      }

      resetForm();
      fetchTimetables();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save timetable"
      );
    }
  };

  const handleEdit = (timetable) => {
    setEditingTimetable(timetable);

    setFormData({
      timetableId: timetable.timetableId,
      courseId: timetable.courseId,
      subjectId: timetable.subjectId,
      facultyId: timetable.facultyId,
      day: timetable.day,
      startTime: timetable.startTime,
      endTime: timetable.endTime,
      room: timetable.room,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this timetable?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/timetables/${id}`);

      alert("Timetable deleted successfully");

      fetchTimetables();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete timetable"
      );
    }
  };

  return (
    <main className="dashboard timetable-page">
      <div className="timetable-container">

        {/* Header */}

        <div className="timetable-header">
          <div>
            <h2>Timetable</h2>
            <p>
              Manage class schedules, faculty assignments,
              rooms, and timings.
            </p>
          </div>

          <div className="timetable-count">
            <strong>{timetables.length}</strong>
            <span>Total Records</span>
          </div>
        </div>

        {/* Form */}

        <div className="timetable-form-card">
          <h3>
            {editingTimetable
              ? "Update Timetable"
              : "Add Timetable"}
          </h3>

          <form
            className="timetable-form"
            onSubmit={handleSubmit}
          >
            <div className="timetable-form-grid">

              <div className="form-group">
                <label htmlFor="timetableId">
                  Timetable ID
                </label>

                <input
                  id="timetableId"
                  name="timetableId"
                  placeholder="Enter timetable ID"
                  value={formData.timetableId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="courseId">
                  Course ID
                </label>

                <input
                  id="courseId"
                  name="courseId"
                  placeholder="Enter course ID"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subjectId">
                  Subject ID
                </label>

                <input
                  id="subjectId"
                  name="subjectId"
                  placeholder="Enter subject ID"
                  value={formData.subjectId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="facultyId">
                  Faculty ID
                </label>

                <input
                  id="facultyId"
                  name="facultyId"
                  placeholder="Enter faculty ID"
                  value={formData.facultyId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="day">
                  Day
                </label>

                <select
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                >
                  <option value="Monday">
                    Monday
                  </option>
                  <option value="Tuesday">
                    Tuesday
                  </option>
                  <option value="Wednesday">
                    Wednesday
                  </option>
                  <option value="Thursday">
                    Thursday
                  </option>
                  <option value="Friday">
                    Friday
                  </option>
                  <option value="Saturday">
                    Saturday
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="room">
                  Room
                </label>

                <input
                  id="room"
                  name="room"
                  placeholder="Enter room"
                  value={formData.room}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="startTime">
                  Start Time
                </label>

                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endTime">
                  End Time
                </label>

                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="timetable-form-actions">
              {editingTimetable && (
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
                {editingTimetable
                  ? "Update Timetable"
                  : "Add Timetable"}
              </button>
            </div>
          </form>
        </div>

        {/* Records */}

        <div className="timetable-records-card">
          <div className="timetable-records-header">
            <h3>Timetable Records</h3>
          </div>

          {timetables.length === 0 ? (
            <div className="timetable-empty-state">
              <h4>No timetable records found</h4>
              <p>
                Add a timetable record to start managing
                class schedules.
              </p>
            </div>
          ) : (
            <div className="timetable-table-wrapper">
              <table className="timetable-table">
                <thead>
                  <tr>
                    <th>Timetable ID</th>
                    <th>Course ID</th>
                    <th>Subject ID</th>
                    <th>Faculty ID</th>
                    <th>Day</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Room</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {timetables.map((timetable) => (
                    <tr key={timetable._id}>
                      <td className="timetable-id">
                        {timetable.timetableId}
                      </td>

                      <td className="timetable-course-id">
                        {timetable.courseId}
                      </td>

                      <td className="timetable-subject-id">
                        {timetable.subjectId}
                      </td>

                      <td className="timetable-faculty-id">
                        {timetable.facultyId}
                      </td>

                      <td>
                        <span className="timetable-day-badge">
                          {timetable.day}
                        </span>
                      </td>

                      <td className="timetable-time">
                        {timetable.startTime}
                      </td>

                      <td className="timetable-time">
                        {timetable.endTime}
                      </td>

                      <td>
                        <span className="timetable-room-badge">
                          {timetable.room}
                        </span>
                      </td>

                      <td>
                        <div className="timetable-actions">
                          <button
                            className="edit-button"
                            onClick={() =>
                              handleEdit(timetable)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                timetable._id
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

export default Timetable;