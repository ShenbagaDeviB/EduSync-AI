import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>EduERP</h2>

      <nav>
        <ul>

          {/* Dashboard */}
          <li>
            <Link to="/">Dashboard</Link>
          </li>

          {/* Student Management */}
          <li>
            <Link to="/students">Students</Link>
          </li>

          <li>
            <Link to="/student-profile">Student Profile</Link>
          </li>

          {/* Faculty Management */}
          <li>
            <Link to="/faculty">Faculty</Link>
          </li>

          <li>
            <Link to="/faculty-profile">Faculty Profile</Link>
          </li>

          {/* Academic Management */}
          <li>
            <Link to="/departments">Departments</Link>
          </li>

          <li>
            <Link to="/courses">Courses</Link>
          </li>

          <li>
            <Link to="/subjects">Subjects</Link>
          </li>

          <li>
            <Link to="/enrollments">Enrollments</Link>
          </li>

          {/* Academic Operations */}
          <li>
            <Link to="/attendance">Attendance</Link>
          </li>

          <li>
            <Link to="/timetable">Timetable</Link>
          </li>

          <li>
            <Link to="/exams">Exams</Link>
          </li>

          <li>
            <Link to="/results">Results</Link>
          </li>

          {/* Finance */}
          <li>
            <Link to="/fees">Fees</Link>
          </li>

          {/* Library */}
          <li>
            <Link to="/library">Library</Link>
          </li>

          <li>
            <Link to="/library-issues">Library Issues</Link>
          </li>

          {/* Hostel */}
          <li>
            <Link to="/hostel">Hostel</Link>
          </li>

          <li>
            <Link to="/hostel-rooms">Hostel Rooms</Link>
          </li>

          <li>
            <Link to="/hostel-allocations">Hostel Allocations</Link>
          </li>

          {/* Events */}
          <li>
            <Link to="/events">Events</Link>
          </li>

          <li>
            <Link to="/event-registrations">Event Registrations</Link>
          </li>

          {/* Communication */}
          <li>
            <Link to="/announcements">Announcements</Link>
          </li>

          <li>
            <Link to="/notifications">Notifications</Link>
          </li>

          <li>
            <Link to="/documents">Documents</Link>
          </li>

          {/* Staff Management */}
          <li>
            <Link to="/leave">Leave</Link>
          </li>

          <li>
            <Link to="/payroll">Payroll</Link>
          </li>

          <li>
            <Link to="/feedback">Feedback</Link>
          </li>

          <li>
            <Link to="/complaints">Complaints</Link>
          </li>

          {/* Analytics & AI */}
          <li>
            <Link to="/reports">Reports</Link>
          </li>

          <li>
            <Link to="/ai-command-center">AI Command Center</Link>
          </li>

          {/* System */}
          <li>
            <Link to="/users">Users</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <Link to="/settings">Settings</Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;