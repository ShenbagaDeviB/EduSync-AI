const Dashboard = () => {
  return (
    <main className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Students</h3>
          <p>Manage students</p>
        </div>

        <div className="dashboard-card">
          <h3>Faculty</h3>
          <p>Manage faculty</p>
        </div>

        <div className="dashboard-card">
          <h3>Courses</h3>
          <p>Manage courses</p>
        </div>

        <div className="dashboard-card">
          <h3>Attendance</h3>
          <p>Track attendance</p>
        </div>

        <div className="dashboard-card">
          <h3>Fees</h3>
          <p>Manage fees</p>
        </div>

        <div className="dashboard-card">
          <h3>AI Command Center</h3>
          <p>AI-powered ERP assistance</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;