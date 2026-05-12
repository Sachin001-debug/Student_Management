import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/assigned/subjects/student`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setSubjects(res.data.subjects || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  if (loading) return <p>Loading subjects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (subjects.length === 0) return <p>No subjects found for your class.</p>;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between w-full"> 
        <h1 className="font-bold text-3xl text-[#8E2C4A]">Subjects For Your Class</h1>
      <h1 className="font-semibold text-2xl">{subjects[0]?.class}</h1>
      </div>
      {subjects.map((subject) => (
        <>
          <div
            key={subject.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p className="font-semibold text-xl  text-[#8E2C4A]">{subject.subject_name}</p>
            <p className="text-gray-600">{subject.subject_code}</p>
            {subject.teacher_name && (
              <p className="text-sm text-gray-500 mt-1">
                Teacher: {subject.teacher_name}
              </p>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default StudentSubjects;
