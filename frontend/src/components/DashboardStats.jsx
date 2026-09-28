import { useEffect, useState } from "react";
import api from "../api/api";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
    attendance: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          studentsResponse,
          facultyResponse,
          coursesResponse,
          attendanceResponse
        ] = await Promise.all([
          api.get("/students"),
          api.get("/faculties"),
          api.get("/courses"),
          api.get("/attendance")
        ]);

        const attendance = attendanceResponse.data;

        const attendancePercentage =
          attendance.length > 0
            ? Math.round(
                (attendance.filter(
                  (record) => record.status === "Present"
                ).length /
                  attendance.length) *
                  100
              )
            : 0;

        setStats({
          students: studentsResponse.data.length,
          faculty: facultyResponse.data.length,
          courses: coursesResponse.data.length,
          attendance: attendancePercentage
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-cards">
      <div className="dashboard-card">
        <h3>Total Students</h3>
        <p>{stats.students}</p>
      </div>

      <div className="dashboard-card">
        <h3>Total Faculty</h3>
        <p>{stats.faculty}</p>
      </div>

      <div className="dashboard-card">
        <h3>Total Courses</h3>
        <p>{stats.courses}</p>
      </div>

      <div className="dashboard-card">
        <h3>Attendance</h3>
        <p>{stats.attendance}%</p>
      </div>
    </div>
  );
};

export default DashboardStats;