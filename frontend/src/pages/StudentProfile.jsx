import { useEffect, useState } from "react";
import api from "../api/api";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get("/students");

        if (response.data.length > 0) {
          setStudent(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch student:", error);
      }
    };

    fetchStudent();
  }, []);

  return (
    <main className="dashboard">
      <h2>Student Profile</h2>

      {!student ? (
        <p>No student profile found.</p>
      ) : (
        <div
          className="dashboard-card"
          style={{
            maxWidth: "700px",
            marginTop: "20px"
          }}
        >
          <h3>{student.name}</h3>

          <p>
            <strong>Student ID:</strong> {student.studentId}
          </p>

          <p>
            <strong>Email:</strong> {student.email}
          </p>

          <p>
            <strong>Department:</strong> {student.department}
          </p>

          <p>
            <strong>Course:</strong> {student.course}
          </p>

          <p>
            <strong>Year:</strong> {student.year}
          </p>
        </div>
      )}
    </main>
  );
};

export default StudentProfile;