import { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  // FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/teacher/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data.students || []);
    } catch (err) {
      console.log("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // MARK ATTENDANCE
  const markAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // SAVE ATTENDANCE
  const saveAttendance = async () => {
    try {
      setSaving(true);

      const records = Object.entries(attendance).map(
        ([student_id, status]) => ({
          student_id,
          status,
        })
      );

      await axios.post(
        `${API}/attendance/mark`,
        {
          records,
          date: new Date().toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Attendance saved successfully!");

      setAttendance({});
    } catch (err) {
      console.log("Error saving attendance:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-[#8E2C4A]">
        Daily Attendance
      </h1>

      {/* LOADING */}
      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found for your assigned classes</p>
      ) : (
        <>
          {/* STUDENT LIST */}
          <div className="grid gap-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="border p-3 rounded shadow flex justify-between items-center"
              >
                {/* INFO */}
                <div>
                  <h2 className="font-semibold">
                    {student.name}
                  </h2>
                  <p className="text-[#8E2C4A] text-sm">
                    Class: {student.class_name}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      markAttendance(student.id, "present")
                    }
                    className={`px-3 py-1 rounded text-white ${
                      attendance[student.id] === "present"
                        ? "bg-green-700"
                        : "bg-green-500"
                    }`}
                  >
                    Present
                  </button>

                  <button
                    onClick={() =>
                      markAttendance(student.id, "absent")
                    }
                    className={`px-3 py-1 rounded text-white ${
                      attendance[student.id] === "absent"
                        ? "bg-red-700"
                        : "bg-red-500"
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={saveAttendance}
            disabled={saving}
            className="mt-6 bg-[#8E2C4A] text-white px-4 py-2 rounded hover:bg-[#6E1A37]"
          >
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        </>
      )}
    </div>
  );
};

export default Attendance;