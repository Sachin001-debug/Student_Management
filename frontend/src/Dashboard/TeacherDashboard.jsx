import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  File,
  Sheet,
  User2,
  Database
} from "lucide-react";

import { useNavigate } from 'react-router-dom';

import TeacherDashboardContent from '../components/Teacher/TeacherDashboardContent';
import Profile from '../shared/Profile';
import ViewNotice from '../shared/ViewNotice';

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  // Navigation handler
  const navigateTo = (page) => {
    setActivePage(page);
    if (window.innerWidth < 768) closeSidebar();
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* SIDEBAR */}
      <nav
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-gray-900 text-white p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h2 className="text-2xl font-bold">Teacher Panel</h2>
          <button onClick={closeSidebar} className="text-white hover:text-gray-300">
            <X size={28} />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-10 hidden md:block">
          Teacher Panel
        </h2>

        <ul className="space-y-2 flex-1">
          <li
            onClick={() => navigateTo("dashboard")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "dashboard" ? "bg-gray-800 text-green-400" : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <LayoutDashboard size={22} />
            Dashboard
          </li>

          <li
            onClick={() => navigateTo("courses")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "courses" ? "bg-gray-800 text-green-400" : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <BookOpen size={22} />
            Subject
          </li>

          <li
            onClick={() => navigateTo("assignments")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "assignments" ? "bg-gray-800 text-green-400" : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <ClipboardList size={22} />
            Assignments
          </li>

          <li
            onClick={() => navigateTo("exams")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "exams" ? "bg-gray-800 text-green-400" : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <BarChart3 size={22} />
            Exams
          </li>

          <li
            onClick={() => navigateTo("attendance")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "attendance" ? "bg-gray-800 text-green-400" : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <Sheet size={22}/>
             Attendance
          </li>

          <li
            onClick={() => navigateTo("students")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "students" ? "bg-gray-800 text-green-400" : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <User2 size={22}/>
             Students
          </li>

          <li
            onClick={() => navigateTo("results")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "results" ? "bg-gray-800 text-green-400" : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <Database size={22}/>
             Results
          </li>

          <li
            onClick={() => navigateTo("profile")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "profile" ? "bg-gray-800 text-green-400" : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <User size={22} />
            Profile
          </li>

          <li
            onClick={() => navigateTo("notices")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "notices" ? "bg-gray-800 text-green-400" : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <File size={22} />
             Notices
          </li>
        </ul>

        {/* Logout */}
        <div className="mt-auto pt-8 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors text-lg w-full py-3 px-4 rounded-lg hover:bg-gray-800"
          >
            <LogOut size={22} />
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-white border-b flex items-center px-6 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-700 hover:text-black mr-4"
          >
            <Menu size={28} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {activePage}
          </h1>
        </header>

        {/* Dynamic Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {activePage === "dashboard" && <TeacherDashboardContent />}
          {activePage === "profile" && <Profile />}
           {activePage === "notices" && <ViewNotice />}

          {/* Placeholder for other pages */}
          {activePage === "courses" && <div className="text-center mt-20"><h2 className="text-3xl text-gray-500">Courses Management</h2></div>}
          {activePage === "assignments" && <div className="text-center mt-20"><h2 className="text-3xl text-gray-500">Assignments</h2></div>}
          {activePage === "exams" && <div className="text-center mt-20"><h2 className="text-3xl text-gray-500">Exams &amp; Tests</h2></div>}
          {activePage === "attendance" && <div className="text-center mt-20"><h2 className="text-3xl text-gray-500">Attendance Management</h2></div>}
          {activePage === "students" && <div className="text-center mt-20"><h2 className="text-3xl text-gray-500">Students List</h2></div>}
          {activePage === "results" && <div className="text-center mt-20"><h2 className="text-3xl text-gray-500">Results &amp; Grading</h2></div>}
        
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;