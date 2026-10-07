import { useEffect, useState } from "react";
import api from "../api/api";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get("/students");

        if (response.data.length > 0) {
          setStudent(response.data[0]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch student:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const getInitial = () => {
    if (!student?.name) {
      return "S";
    }

    return student.name.charAt(0).toUpperCase();
  };

  return (
    <main className="dashboard student-profile-page">
      <div className="student-profile-container">

        <div className="student-profile-header">
          <h2>Student Profile</h2>
          <p>
            View student information and academic details.
          </p>
        </div>

        {loading ? (
          <div className="student-profile-state">
            <p>Loading student profile...</p>
          </div>
        ) : !student ? (
          <div className="student-profile-state">
            <h4>No student profile found</h4>
            <p>
              Student information is not available.
            </p>
          </div>
        ) : (
          <div className="student-profile-card">

            <div className="student-profile-top">
              <div className="student-profile-avatar">
                {getInitial()}
              </div>

              <div className="student-profile-identity">
                <h3>{student.name}</h3>

                <span className="student-profile-id">
                  {student.studentId}
                </span>
              </div>
            </div>

            <div className="student-profile-divider" />

            <div className="student-profile-details">

              <div className="student-profile-detail-item">
                <span>Email</span>
                <strong>{student.email}</strong>
              </div>

              <div className="student-profile-detail-item">
                <span>Student ID</span>
                <strong>{student.studentId}</strong>
              </div>

              <div className="student-profile-detail-item">
                <span>Department</span>
                <strong>{student.department}</strong>
              </div>

              <div className="student-profile-detail-item">
                <span>Course</span>
                <strong>{student.course}</strong>
              </div>

              <div className="student-profile-detail-item">
                <span>Year</span>
                <strong>{student.year}</strong>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default StudentProfile;