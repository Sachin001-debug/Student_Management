import { useState, useEffect } from "react";
import axios from "axios";

const AssignStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isAsignFormOpen, setIsAsignFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);


  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setStudents(res.data.students);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Assign Students</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        {students.map((student) => (
          <div
            key={student.id}
            className="p-3 border rounded mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{student.name}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
              <p className="text-sm text-blue-600">
                Class: {student.class_name || "Not Assigned"}
              </p>
            </div>

            <button onClick={()=>{
                setIsAsignFormOpen(true)
                setSelectedStudent(student)
            }} 
            className="bg-[#8E2C4A] text-white px-4 py-2 rounded">
              Assign Class
            </button>
          </div>
        ))
    }
      {isAsignFormOpen && selectedStudent && (
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
                      {selectedStudent.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {selectedStudent.email}
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
  );
};

export default AssignStudent;