import { useEffect, useState } from "react";
import api from "../api/api";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
    attendance: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          studentsResponse,
          facultyResponse,
          coursesResponse,
          attendanceResponse,
        ] = await Promise.all([
          api.get("/students"),
          api.get("/faculties"),
          api.get("/courses"),
          api.get("/attendance"),
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
          attendance: attendancePercentage,
        });
      } catch (error) {
        console.error(
          "Failed to fetch dashboard stats:",
          error
        );
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Students",
      value: stats.students,
      icon: "S",
      className: "dashboard-stat-students",
    },
    {
      title: "Total Faculty",
      value: stats.faculty,
      icon: "F",
      className: "dashboard-stat-faculty",
    },
    {
      title: "Total Courses",
      value: stats.courses,
      icon: "C",
      className: "dashboard-stat-courses",
    },
    {
      title: "Attendance",
      value: `${stats.attendance}%`,
      icon: "A",
      className: "dashboard-stat-attendance",
    },
  ];

  return (
    <div className="dashboard-cards">
      {statCards.map((card) => (
        <div
          className={`dashboard-card ${card.className}`}
          key={card.title}
        >
          <div className="dashboard-card-icon">
            {card.icon}
          </div>

          <div className="dashboard-card-content">
            <span>{card.title}</span>
            <strong>{card.value}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;