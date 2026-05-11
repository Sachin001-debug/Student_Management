import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import StudentDashboard from "./Dashboard/StudentDashboard";
import TeacherDashboard from "./Dashboard/TeacherDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UnknownRoutes from "./components/UnknownRoutes";

const App = () => {
  const role = localStorage.getItem("role");//role is saved in while loging the user

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Protected Student Route */}
      <Route path="/student/dashboard" element={ <ProtectedRoute isAuthenticated={role === "student"}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Teacher Route */}
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute isAuthenticated={role === "teacher"}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Route */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute isAuthenticated={role === "admin"}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all unknown routes */}
      <Route path="*" element={<UnknownRoutes/>} />
    </Routes>
  );
};

export default App;