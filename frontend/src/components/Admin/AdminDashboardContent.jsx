import axios from "axios";
import { User2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminDashboardContent = () => {
  // state for teacher and student
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  // fetch students
  const fetchStudentNumber = async () => {
    try {
      const res = await axios.get(`${API}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data.students);
    } catch (err) {
      console.log("Error fetching student number", err);
    }
  };

  // fetch teachers
  const fetchTeacherNumber = async () => {
    try {
      const res = await axios.get(`${API}/teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeachers(res.data.teachers);
    } catch (err) {
      console.log("Error fetching teacher number", err);
    }
  };

  // run on component load
  useEffect(() => {
    fetchStudentNumber();
    fetchTeacherNumber();
  }, []);

  return (
    <div className="flex flex-wrap gap-8 p-6">
      {/* Student Card */}
      <div className="w-[250px] bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <User2 size={32} className="text-blue-600" />

          <h2 className="text-lg font-semibold text-gray-700">Students</h2>
        </div>

        <div className="mt-6">
          <div className="flex gap-2">
            <p className="text-sm text-gray-500 mt-2">
              Total Registered Students:
            </p>
            <h1 className="text-3xl font-bold text-blue-600">
              {students.length}
            </h1>
          </div>
        </div>
      </div>

      {/* Teacher Card */}
      <div className="w-[250px] bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <User2 size={32} className="text-green-600" />

          <h2 className="text-lg font-semibold text-gray-700">Teachers</h2>
        </div>

        <div className="mt-6">
          <div className="flex gap-4">
            <p className="text-sm text-gray-500 mt-2">
              Total Registered Teachers:
            </p>
            <h1 className="text-3xl font-bold text-green-600">
              {teachers.length}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
