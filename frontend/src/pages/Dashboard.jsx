import DashboardStats from "../components/DashboardStats";

const Dashboard = () => {
  return (
    <main className="dashboard dashboard-page">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <div>
            <h2>Dashboard</h2>
            <p>
              Manage students, faculty, academics, and administration.
            </p>
          </div>

          <div className="dashboard-welcome">
            <span>Educational Institution ERP</span>
          </div>
        </div>

        <DashboardStats />

      </div>
    </main>
  );
};

export default Dashboard;