import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BookOpen, Trash2, Filter } from "lucide-react";

const ManageSubjects = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  // Fetch all classes
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API}/subject/classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setClasses(response.data.classes || []);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Failed to fetch classes");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  //useEffect to Fetch subjects when class is selected
  useEffect(() => {
    if (selectedClass) {
      fetchSubjectsByClass();
    } else {
      setSubjects([]);
    }
  }, [selectedClass]);

  //fetch sub by class from subjectController
  const fetchSubjectsByClass = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API}/subject/class/${selectedClass}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSubjects(response.data.subjects || []);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to fetch subjects for this class");
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  //handles ddeletes of the sub from the list 
  const handleDeleteSubject = async (subjectId, subjectName) => {
    if (!window.confirm(`Delete ${subjectName}?`)) return;

    try {
      const response = await axios.delete(`${API}/subject/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Subject deleted successfully");
        fetchSubjectsByClass(); 
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete subject");
    }
  };

  // Fallback classes if none in DB
  const availableClasses = classes.length > 0 ? classes : [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Manage Subjects</h2>
        <p className="text-gray-600 mt-1">View and manage subjects by class</p>
      </div>

      {/* Class Selector */}
      <div className="bg-white rounded-xl shadow p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Class
        </label>
        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8E2C4A] focus:border-transparent"
          >
            <option value="">Choose a class...</option>
            {availableClasses.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>

          <button
            onClick={fetchSubjectsByClass}
            disabled={!selectedClass || loading}
            className="bg-[#8E2C4A] text-white px-5 py-3 rounded-lg hover:bg-[#6E1A37] transition disabled:opacity-50"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Subjects Table */}
      {selectedClass && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              Subjects in {selectedClass}
            </h3>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading subjects...</div>
          ) : subjects.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No subjects found for <strong>{selectedClass}</strong>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subjects.map((subject) => (
                    <tr key={subject.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <BookOpen size={20} className="text-[#8E2C4A]" />
                          <span className="font-medium text-gray-900">
                            {subject.subject_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-mono">
                        {subject.subject_code}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {subject.teacher_name || "Not Assigned"}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(subject.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteSubject(subject.id, subject.subject_name)}
                          className="text-red-600 hover:text-red-800 transition p-2 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageSubjects;