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
  Sheet,
} from "lucide-react";

import StudentDashboardContent from '../components/Student/StudentDashboardContent';
import Profile from '../shared/Profile';   
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // Default page

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const navigate = useNavigate();

  // Navigation handler
  const navigateTo = (page) => {
    setActivePage(page);
    if (window.innerWidth < 764) closeSidebar(); // mobileClose on 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login')
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
          <h2 className="text-2xl font-bold">Student Panel</h2>
          <button onClick={closeSidebar} className="text-white hover:text-gray-300">
            <X size={28} />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-10 hidden md:block">
          Student Panel
        </h2>

        <ul className="space-y-2 flex-1">
          <li
            onClick={() => navigateTo("dashboard")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "dashboard"
                ? "bg-gray-800 text-green-400"
                : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <LayoutDashboard size={22} />
            Dashboard
          </li>

          <li
            onClick={() => navigateTo("courses")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "courses"
                ? "bg-gray-800 text-green-400"
                : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <BookOpen size={22} />
            Courses
          </li>

          <li
            onClick={() => navigateTo("assignments")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "assignments"
                ? "bg-gray-800 text-green-400"
                : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <ClipboardList size={22} />
            Assignments
          </li>

          <li
            onClick={() => navigateTo("results")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "results"
                ? "bg-gray-800 text-green-400"
                : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <BarChart3 size={22} />
            Results
          </li>

          <li
            onClick={() => navigateTo("profile")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "profile"
                ? "bg-gray-800 text-green-400"
                : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <User size={22} />
            Profile
          </li>

            <li
            onClick={() => navigateTo("notice")}
            className={`flex items-center gap-3 text-lg cursor-pointer py-3 px-4 rounded-lg transition-all ${
              activePage === "notice"
                ? "bg-gray-800 text-green-400"
                : "hover:text-green-400 hover:bg-gray-800"
            }`}
          >
            <Sheet size={22} />
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-14 flex items-center px-6 bg-white border-b justify-between md:justify-start shadow-sm">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-700 hover:text-black"
          >
            <Menu size={28} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {activePage}
          </h1>
        </header>

        {/* Dynamic Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {activePage === "dashboard" && <StudentDashboardContent />}
          {activePage === "profile" && <Profile />}
          
        {/*after making components */}
          {activePage === "courses" && (
            <div className="text-center text-gray-500 mt-20">
           
            </div>
          )}
          {activePage === "assignments" && (
            <div className="text-center text-gray-500 mt-20">
            </div>
          )}
          {activePage === "results" && (
            <div className="text-center text-gray-500 mt-20">
            </div>
          )}
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

export default StudentDashboard;