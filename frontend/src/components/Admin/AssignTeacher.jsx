import axios from "axios";
import { useState, useEffect } from "react";
import { UserCheck } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const AssignTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAsignFormOpen, setIsAsignFormOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTeachers();
  }, []);

  //fetching  teachers from roleBasedAccess
  //lists all teachers

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/teachers`, {
        // ← Updated endpoint
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setTeachers(res.data.teachers);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Assign Teachers</h1>
          <p className="text-gray-600 mt-1">Assign teachers to classes</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            Loading teachers...
          </div>
        ) : teachers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No teachers found
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Teacher Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#8E2C4A] text-white rounded-full flex items-center justify-center font-medium">
                          {teacher.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {teacher.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-gray-600">{teacher.email}</td>
                    <td className="px-6 py-5 text-gray-500 text-sm">
                      {new Date(teacher.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setIsAsignFormOpen(true);
                        }}
                        className="inline-flex items-center gap-2 bg-[#8E2C4A] hover:bg-[#6E1A37] text-white px-5 py-2.5 rounded-lg transition font-medium"
                      >
                        <UserCheck size={18} />
                        Assign Class
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isAsignFormOpen && selectedTeacher && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <form className="bg-white p-6 rounded-xl shadow-xl w-[400px]">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Assign Class</h1>

                    <button
                      type="button"
                      onClick={() => setIsAsignFormOpen(false)}
                      className="text-red-500 text-lg"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800">
                      {selectedTeacher.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {selectedTeacher.email}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Assign Class</label>

                    <input
                      type="text"
                      placeholder="Enter class"
                      className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#8E2C4A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-5 bg-[#8E2C4A] hover:bg-[#6E1A37] text-white py-2 rounded-lg"
                  >
                    Save Assignment
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AssignTeacher;
