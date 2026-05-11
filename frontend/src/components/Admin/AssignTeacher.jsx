import axios from "axios";
import { useState, useEffect } from "react";
import { UserCheck } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const AssignTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [assignedClass, setAssignedClass] = useState("");
  const [isAsignFormOpen, setIsAsignFormOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTeachers();
  }, []);

  // FETCH TEACHERS
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setTeachers(res.data.teachers);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  // ASSIGN TEACHER CLASS
  const handleAssignTeacher = async (e) => {
    e.preventDefault();

    try {
      if (!assignedClass) {
        toast.error("Class is required");
        return;
      }

      const res = await axios.post(
        `${API}/assign/teacher`,
        {
          teacher_id: selectedTeacher.id,
          assigned_class: assignedClass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Class assigned successfully!");
        setAssignedClass("");
        setIsAsignFormOpen(false);
        fetchTeachers();
      }
    } catch (err) {
      console.log(err?.response?.data || err);
      toast.error("Assignment failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Assign Teachers</h1>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        {loading ? (
          <p className="p-6">Loading...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-t">
                  <td className="p-4">{teacher.name}</td>
                  <td className="p-4">{teacher.email}</td>

                  {/* STATUS */}
                  <td className="p-4">
                    {teacher.assigned_class &&
                    teacher.assigned_class.length > 1 ? (
                      <span className="text-green-600 font-medium">
                      {teacher.assigned_class.join(", ")}
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        Not Assigned
                      </span>
                    )}
                  </td>

                  {/* ACTION */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setIsAsignFormOpen(true);
                      }}
                      className="bg-[#8E2C4A] text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                    >
                      <UserCheck size={16} />
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {isAsignFormOpen && selectedTeacher && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form
            onSubmit={handleAssignTeacher}
            className="bg-white p-6 rounded-xl w-[400px]"
          >
            <h2 className="text-xl font-bold mb-4">
              Assign Class to {selectedTeacher.name}
            </h2>

            <input
              value={assignedClass}
              onChange={(e) => setAssignedClass(e.target.value)}
              type="text"
              placeholder="Enter class (e.g. 10, 11)"
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-[#8E2C4A] text-white py-2 rounded"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setIsAsignFormOpen(false)}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AssignTeacher;