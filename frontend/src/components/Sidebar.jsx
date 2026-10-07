import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "sidebar-link-active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>EduERP</h2>
        <span>Educational ERP</span>
      </div>

      <nav className="sidebar-nav">

        {/* Overview */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Overview
          </span>

          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
        </div>

        {/* Students */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Students
          </span>

          <NavLink
            to="/students"
            className={linkClass}
          >
            Students
          </NavLink>

          <NavLink
            to="/student-profile"
            className={linkClass}
          >
            Student Profile
          </NavLink>
        </div>

        {/* Faculty */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Faculty
          </span>

          <NavLink
            to="/faculty"
            className={linkClass}
          >
            Faculty
          </NavLink>

          <NavLink
            to="/faculty-profile"
            className={linkClass}
          >
            Faculty Profile
          </NavLink>
        </div>

        {/* Academics */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Academics
          </span>

          <NavLink
            to="/departments"
            className={linkClass}
          >
            Departments
          </NavLink>

          <NavLink
            to="/courses"
            className={linkClass}
          >
            Courses
          </NavLink>

          <NavLink
            to="/subjects"
            className={linkClass}
          >
            Subjects
          </NavLink>

          <NavLink
            to="/enrollments"
            className={linkClass}
          >
            Enrollments
          </NavLink>
        </div>

        {/* Academic Operations */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Academic Operations
          </span>

          <NavLink
            to="/attendance"
            className={linkClass}
          >
            Attendance
          </NavLink>

          <NavLink
            to="/timetable"
            className={linkClass}
          >
            Timetable
          </NavLink>

          <NavLink
            to="/exams"
            className={linkClass}
          >
            Exams
          </NavLink>

          <NavLink
            to="/results"
            className={linkClass}
          >
            Results
          </NavLink>
        </div>

        {/* Finance */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Finance
          </span>

          <NavLink
            to="/fees"
            className={linkClass}
          >
            Fees
          </NavLink>
        </div>

        {/* Library */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Library
          </span>

          <NavLink
            to="/library"
            className={linkClass}
          >
            Library
          </NavLink>

          <NavLink
            to="/library-issues"
            className={linkClass}
          >
            Library Issues
          </NavLink>
        </div>

        {/* Hostel */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Hostel
          </span>

          <NavLink
            to="/hostel"
            className={linkClass}
          >
            Hostel
          </NavLink>

          <NavLink
            to="/hostel-rooms"
            className={linkClass}
          >
            Hostel Rooms
          </NavLink>

          <NavLink
            to="/hostel-allocations"
            className={linkClass}
          >
            Hostel Allocations
          </NavLink>
        </div>

        {/* Events */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Events
          </span>

          <NavLink
            to="/events"
            className={linkClass}
          >
            Events
          </NavLink>

          <NavLink
            to="/event-registrations"
            className={linkClass}
          >
            Event Registrations
          </NavLink>
        </div>

        {/* Communication */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Communication
          </span>

          <NavLink
            to="/announcements"
            className={linkClass}
          >
            Announcements
          </NavLink>

          <NavLink
            to="/notifications"
            className={linkClass}
          >
            Notifications
          </NavLink>

          <NavLink
            to="/documents"
            className={linkClass}
          >
            Documents
          </NavLink>
        </div>

        {/* Staff Management */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Staff Management
          </span>

          <NavLink
            to="/leave"
            className={linkClass}
          >
            Leave
          </NavLink>

          <NavLink
            to="/payroll"
            className={linkClass}
          >
            Payroll
          </NavLink>

          <NavLink
            to="/feedback"
            className={linkClass}
          >
            Feedback
          </NavLink>

          <NavLink
            to="/complaints"
            className={linkClass}
          >
            Complaints
          </NavLink>
        </div>

        {/* Analytics & AI */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            Analytics & AI
          </span>

          <NavLink
            to="/reports"
            className={linkClass}
          >
            Reports
          </NavLink>

          <NavLink
            to="/ai-command-center"
            className={linkClass}
          >
            AI Command Center
          </NavLink>
        </div>

        {/* System */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">
            System
          </span>

          <NavLink
            to="/users"
            className={linkClass}
          >
            Users
          </NavLink>

          <NavLink
            to="/profile"
            className={linkClass}
          >
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            className={linkClass}
          >
            Settings
          </NavLink>
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;