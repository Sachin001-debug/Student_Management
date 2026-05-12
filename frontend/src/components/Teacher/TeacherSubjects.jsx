import { useEffect, useState } from "react";
import axios from "axios";

const TeachersSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/assigned/subjects/teacher`, {
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

  // Group subjects by class
  const groupedSubjects = subjects.reduce((acc, subject)=>{
    const className = subject.class || "other";
    if(!acc[className]){
      acc[className] =[];
    }
    acc[className].push(subject);
    return acc
  },{})

  if (loading) return <p>Loading subjects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (subjects.length === 0) return <p>No subjects found for your class.</p>;

  return (
    <div className="space-y-8">
      {Object.keys(groupedSubjects)
        .map((className) => (
          <div key={className}>
            <h2 className="text-2xl font-semibold text-[#8E2C4A] mb-4 border-b pb-2">
               {className}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedSubjects[className].map((subject) => (
                <div
                  key={subject.id}
                  className="p-5 border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white"
                >
                  <p className="font-semibold text-xl text-[#8E2C4A]">
                    {subject.subject_name}
                  </p>
                  <p className="text-gray-600 mt-1">{subject.subject_code}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TeachersSubjects;
