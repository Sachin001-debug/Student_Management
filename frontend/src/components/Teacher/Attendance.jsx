import { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [students, setStudents] = useState([]);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setStudents(res.data.students);
        console.log("Fetched successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="space-y-3">
      {students.map((student) => (
        <div
          key={student.id}
          className="p-4 border rounded-lg shadow-sm"
        >
          <p className="font-semibold">{student.name}</p>

          <p className="text-sm text-gray-500">
            {student.email}
          </p>

          <p className="text-sm text-blue-600">
            Class: {student.class_name || "Not Assigned"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Attendance;