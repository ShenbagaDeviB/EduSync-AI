import { useEffect, useState } from "react";
import api from "../api/api";

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [editingTimetable, setEditingTimetable] = useState(null);

  const [formData, setFormData] = useState({
    timetableId: "",
    courseId: "",
    subjectId: "",
    facultyId: "",
    day: "Monday",
    startTime: "",
    endTime: "",
    room: ""
  });

  const fetchTimetables = async () => {
    try {
      const response = await api.get("/timetables");
      setTimetables(response.data);
    } catch (error) {
      console.error("Failed to fetch timetables:", error);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        setEditingTimetable(null);
      } else {
        await api.post("/timetables", formData);
        alert("Timetable added successfully");
      }

      setFormData({
        timetableId: "",
        courseId: "",
        subjectId: "",
        facultyId: "",
        day: "Monday",
        startTime: "",
        endTime: "",
        room: ""
      });

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
      room: timetable.room
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this timetable?")) {
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
    <main className="dashboard">
      <h2>Timetable</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="timetableId"
          placeholder="Timetable ID"
          value={formData.timetableId}
          onChange={handleChange}
          required
        />

        <input
          name="courseId"
          placeholder="Course ID"
          value={formData.courseId}
          onChange={handleChange}
          required
        />

        <input
          name="subjectId"
          placeholder="Subject ID"
          value={formData.subjectId}
          onChange={handleChange}
          required
        />

        <input
          name="facultyId"
          placeholder="Faculty ID"
          value={formData.facultyId}
          onChange={handleChange}
          required
        />

        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          required
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>

        <input
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        <input
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        <input
          name="room"
          placeholder="Room"
          value={formData.room}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingTimetable
            ? "Update Timetable"
            : "Add Timetable"}
        </button>
      </form>

      <hr />

      <h3>Timetable Records</h3>

      {timetables.length === 0 ? (
        <p>No timetable records found.</p>
      ) : (
        <table>
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
                <td>{timetable.timetableId}</td>
                <td>{timetable.courseId}</td>
                <td>{timetable.subjectId}</td>
                <td>{timetable.facultyId}</td>
                <td>{timetable.day}</td>
                <td>{timetable.startTime}</td>
                <td>{timetable.endTime}</td>
                <td>{timetable.room}</td>

                <td>
                  <button
                    onClick={() => handleEdit(timetable)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(timetable._id)}
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

export default Timetable;