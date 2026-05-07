import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentDashboard from "./Dashboard/StudentDashboard";
import TeacherDashboard from "./Dashboard/TeacherDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student/dashboard" element={<StudentDashboard/>}/>
        <Route path="/teacher/dashboard" element={<TeacherDashboard/>}/>
    </Routes>
  );
};

export default App;
