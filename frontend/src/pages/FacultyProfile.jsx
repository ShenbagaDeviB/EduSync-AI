import { useEffect, useState } from "react";
import api from "../api/api";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await api.get("/faculties");

        if (response.data.length > 0) {
          setFaculty(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch faculty:", error);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <main className="dashboard">
      <h2>Faculty Profile</h2>

      {!faculty ? (
        <p>No faculty profile found.</p>
      ) : (
        <div
          className="dashboard-card"
          style={{
            maxWidth: "700px",
            marginTop: "20px"
          }}
        >
          <h3>{faculty.name}</h3>

          <p>
            <strong>Faculty ID:</strong> {faculty.facultyId}
          </p>

          <p>
            <strong>Email:</strong> {faculty.email}
          </p>

          <p>
            <strong>Department:</strong> {faculty.department}
          </p>

          <p>
            <strong>Designation:</strong> {faculty.designation}
          </p>
        </div>
      )}
    </main>
  );
};

export default FacultyProfile;