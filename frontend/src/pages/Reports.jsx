import { useEffect, useState } from "react";
import api from "../api/api";

const initialReport = {
  students: 0,
  faculty: 0,
  courses: 0,
  subjects: 0,
  attendance: 0,
  exams: 0,
  results: 0,
  fees: 0,
};

const Reports = () => {
  const [report, setReport] = useState(initialReport);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const [
        students,
        faculty,
        courses,
        subjects,
        attendance,
        exams,
        results,
        fees,
      ] = await Promise.all([
        api.get("/students"),
        api.get("/faculties"),
        api.get("/courses"),
        api.get("/subjects"),
        api.get("/attendance"),
        api.get("/exams"),
        api.get("/results"),
        api.get("/fees"),
      ]);

      setReport({
        students: students.data.length,
        faculty: faculty.data.length,
        courses: courses.data.length,
        subjects: subjects.data.length,
        attendance: attendance.data.length,
        exams: exams.data.length,
        results: results.data.length,
        fees: fees.data.length,
      });
    } catch (error) {
      console.error(
        "Failed to fetch report:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const reportCards = [
    {
      title: "Total Students",
      value: report.students,
      className: "report-students",
    },
    {
      title: "Total Faculty",
      value: report.faculty,
      className: "report-faculty",
    },
    {
      title: "Total Courses",
      value: report.courses,
      className: "report-courses",
    },
    {
      title: "Total Subjects",
      value: report.subjects,
      className: "report-subjects",
    },
    {
      title: "Attendance Records",
      value: report.attendance,
      className: "report-attendance",
    },
    {
      title: "Total Exams",
      value: report.exams,
      className: "report-exams",
    },
    {
      title: "Total Results",
      value: report.results,
      className: "report-results",
    },
    {
      title: "Fee Records",
      value: report.fees,
      className: "report-fees",
    },
  ];

  return (
    <main className="dashboard reports-page">
      <div className="reports-container">

        <div className="reports-header">
          <div>
            <h2>ERP Reports</h2>
            <p>
              Overview of important educational ERP
              records and activities.
            </p>
          </div>

          <button
            type="button"
            className="secondary-button reports-refresh"
            onClick={fetchReport}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="reports-state">
            <p>Loading report data...</p>
          </div>
        ) : (
          <div className="reports-grid">

            {reportCards.map((card) => (
              <div
                className={`report-card ${card.className}`}
                key={card.title}
              >
                <div className="report-card-icon">
                  {card.title.charAt(0)}
                </div>

                <div className="report-card-content">
                  <span>{card.title}</span>
                  <strong>{card.value}</strong>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
};

export default Reports;