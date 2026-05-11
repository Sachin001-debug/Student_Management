import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  LogOut,
  Menu,
  X,
  User,
  File,
  WindIcon,
  School2,
  GraduationCap,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CreateSubject from "../components/Admin/CreateSubject";
import Profile from "../shared/Profile";
import ManageSubjects from "../components/Admin/ManageSubjects";
import AssignTeacher from "../components/Admin/AssignTeacher";
import AssignStudent from "../components/Admin/AssignStudent";
import Notice from "../components/Admin/Notice";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navigateTo = (page) => {
    setActivePage(page);
    if (window.innerWidth < 768) closeSidebar();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* SIDEBAR */}
      <nav
        className={`fixed md:static inset-y-0 left-0 w-72 bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo/Header */}
        <div className="px-6 py-8 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "subjects", label: "Create Subject", icon: BookOpen },
              { id: "manageSubjects", label: "Manage Subject", icon: File },
              { id: "assignClass", label: "Assign Teachers", icon: WindIcon },
              { id: "assignStudent", label: "Assign Students", icon: GraduationCap },
              { id: "profile", label: "Profile", icon: User },
              { id: "notice", label: "Notice", icon: Bell},
            ].map(({ id, label, icon: Icon }) => (
              <li
                key={id}
                onClick={() => navigateTo(id)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                  activePage === id
                    ? "bg-gray-800 text-white shadow-inner"
                    : "hover:bg-gray-800/70 text-gray-300 hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-transform duration-200 ${
                    activePage === id ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-500 hover:bg-gray-800 rounded-2xl transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center px-6 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>

          <h1 className="ml-4 md:ml-6 text-xl font-semibold text-gray-800 capitalize tracking-tight">
            {activePage}
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8 bg-gray-50">
          {activePage === "dashboard" && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-gray-700">
                Welcome to Admin Dashboard
              </h2>
              <p className="text-gray-500 mt-3">
                Select an option from the sidebar to get started
              </p>
            </div>
          )}

          {activePage === "subjects" && <CreateSubject />}
          {activePage === "manageSubjects" && <ManageSubjects/>}
          {activePage === "assignClass" && <AssignTeacher />}
          {activePage === "assignStudent" && <AssignStudent />}
          {activePage === "profile" && <Profile />}
          {activePage === "notice" && <Notice />}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default AdminDashboard;