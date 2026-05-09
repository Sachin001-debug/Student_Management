import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentDashboard from "./Dashboard/StudentDashboard";
import TeacherDashboard from "./Dashboard/TeacherDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student/dashboard" element={<StudentDashboard/>}/>
        <Route path="/teacher/dashboard" element={<TeacherDashboard/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
    </Routes>
  );
};

export default App;
