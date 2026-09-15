import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";

import Students from "./pages/Students";
import StudentProfile from "./pages/StudentProfile";

import Faculty from "./pages/Faculty";
import FacultyProfile from "./pages/FacultyProfile";

import Departments from "./pages/Departments";
import Courses from "./pages/Courses";
import Subjects from "./pages/Subjects";
import Enrollments from "./pages/Enrollments";

import Attendance from "./pages/Attendance";
import Timetable from "./pages/Timetable";
import Exams from "./pages/Exams";
import Results from "./pages/Results";

import Fees from "./pages/Fees";

import Library from "./pages/Library";
import LibraryIssues from "./pages/LibraryIssues";

import Hostel from "./pages/Hostel";
import HostelRooms from "./pages/HostelRooms";
import HostelAllocations from "./pages/HostelAllocations";

import Events from "./pages/Events";
import EventRegistrations from "./pages/EventRegistrations";

import Announcements from "./pages/Announcements";
import Notifications from "./pages/Notifications";
import Documents from "./pages/Documents";

import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import Feedback from "./pages/Feedback";
import Complaints from "./pages/Complaints";

import Reports from "./pages/Reports";
import AICommandCenter from "./pages/AICommandCenter";

import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Student Management */}
          <Route path="/students" element={<Students />} />
          <Route path="/student-profile" element={<StudentProfile />} />

          {/* Faculty Management */}
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty-profile" element={<FacultyProfile />} />

          {/* Academic Management */}
          <Route path="/departments" element={<Departments />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/enrollments" element={<Enrollments />} />

          {/* Academic Operations */}
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/results" element={<Results />} />

          {/* Finance */}
          <Route path="/fees" element={<Fees />} />

          {/* Library */}
          <Route path="/library" element={<Library />} />
          <Route path="/library-issues" element={<LibraryIssues />} />

          {/* Hostel */}
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/hostel-rooms" element={<HostelRooms />} />
          <Route path="/hostel-allocations" element={<HostelAllocations />} />

          {/* Events */}
          <Route path="/events" element={<Events />} />
          <Route
            path="/event-registrations"
            element={<EventRegistrations />}
          />

          {/* Communication */}
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/documents" element={<Documents />} />

          {/* Staff Management */}
          <Route path="/leave" element={<Leave />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/complaints" element={<Complaints />} />

          {/* Analytics & AI */}
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/ai-command-center"
            element={<AICommandCenter />}
          />

          {/* System */}
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;