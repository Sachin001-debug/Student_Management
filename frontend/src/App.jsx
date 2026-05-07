import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentDashboard from "./Dashboard/StudentDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student/dashboard" element={<StudentDashboard/>}/>
        <Route path="/teacher/dashboard" element={<StudentDashboard/>}/>
    </Routes>
  );
};

export default App;
