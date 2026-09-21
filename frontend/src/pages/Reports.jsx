import { useEffect, useState } from "react";
import api from "../api/api";

const Reports = () => {
  const [report, setReport] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
    subjects: 0,
    attendance: 0,
    exams: 0,
    results: 0,
    fees: 0
  });

  const fetchReport = async () => {
    try {
      const [
        students,
        faculty,
        courses,
        subjects,
        attendance,
        exams,
        results,
        fees
      ] = await Promise.all([
        api.get("/students"),
        api.get("/faculties"),
        api.get("/courses"),
        api.get("/subjects"),
        api.get("/attendance"),
        api.get("/exams"),
        api.get("/results"),
        api.get("/fees")
      ]);

      setReport({
        students: students.data.length,
        faculty: faculty.data.length,
        courses: courses.data.length,
        subjects: subjects.data.length,
        attendance: attendance.data.length,
        exams: exams.data.length,
        results: results.data.length,
        fees: fees.data.length
      });
    } catch (error) {
      console.error("Failed to fetch report:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const reportCards = [
    { title: "Total Students", value: report.students },
    { title: "Total Faculty", value: report.faculty },
    { title: "Total Courses", value: report.courses },
    { title: "Total Subjects", value: report.subjects },
    { title: "Attendance Records", value: report.attendance },
    { title: "Total Exams", value: report.exams },
    { title: "Total Results", value: report.results },
    { title: "Fee Records", value: report.fees }
  ];

  return (
    <main className="dashboard">
      <h2>ERP Reports</h2>

      <div className="dashboard-cards">
        {reportCards.map((card) => (
          <div className="dashboard-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Reports;