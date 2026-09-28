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
    <main className="dashboard faculty-profile-page">
      <div className="faculty-profile-container">

        <div className="faculty-profile-header">
          <div>
            <h2>Faculty Profile</h2>
            <p>
              View faculty information and professional details.
            </p>
          </div>
        </div>

        {!faculty ? (
          <div className="faculty-profile-empty-state">
            <h4>No faculty profile found</h4>
            <p>
              Faculty profile information is currently unavailable.
            </p>
          </div>
        ) : (
          <div className="faculty-profile-card">

            <div className="faculty-profile-top">
              <div className="faculty-avatar">
                {faculty.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{faculty.name}</h3>

                <span className="faculty-profile-designation">
                  {faculty.designation}
                </span>
              </div>
            </div>

            <div className="faculty-profile-divider" />

            <div className="faculty-profile-grid">

              <div className="faculty-profile-item">
                <span>Faculty ID</span>
                <strong>{faculty.facultyId}</strong>
              </div>

              <div className="faculty-profile-item">
                <span>Email</span>
                <strong>{faculty.email}</strong>
              </div>

              <div className="faculty-profile-item">
                <span>Department</span>
                <strong>{faculty.department}</strong>
              </div>

              <div className="faculty-profile-item">
                <span>Designation</span>
                <strong>{faculty.designation}</strong>
              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
};

export default FacultyProfile;