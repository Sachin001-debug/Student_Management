import { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/teacher/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(res.data.students);
    } catch (err) {
      console.log("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-[#8E2C4A]">
        My Students
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students found for your assigned classes</p>
      ) : (
        <div className="grid gap-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="border p-3 rounded shadow"
            >
              <h2 className="font-semibold">
                {student.name}
              </h2>
              <p className="text-gray-600">
                Email: {student.email}
              </p>
              <p className="text-[#8E2C4A] text-sm">
                Class: {student.class_name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Attendance;