import "../styles/layout.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
};

export default MainLayout;