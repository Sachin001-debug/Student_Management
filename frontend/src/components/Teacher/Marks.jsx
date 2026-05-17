import { useEffect, useState } from "react";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify'

const Marks = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [subjects, setSubjects] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [marksData, setMarksData] = useState({});

  const API = import.meta.env.VITE_API;

  const token = localStorage.getItem("token");

  // fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/teacher/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data.students);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // open form
  const openMarksForm = async (student) => {
  try {
    setSelectedStudent(student);

    setIsFormOpen(true);

    // fetch subjects
    const subjectsRes = await axios.get(
      `${API}/marks/subjects/${student.class_name}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSubjects(subjectsRes.data.subjects);

    // fetch existing marks
    const marksRes = await axios.get(
      `${API}/marks/student/${student.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // convert marks array to object
    // { subject_id: marks }

    const existingMarks = {};

    marksRes.data.marks.forEach((item) => {
      existingMarks[item.subject_id] = item.marks;
    });

    setMarksData(existingMarks);

  } catch (err) {
    console.log(err);
  }
};

  // handle marks input
  const handleMarksChange = (subjectId, value) => {
    setMarksData((prev) => ({
      ...prev,
      [subjectId]: value,
    }));
  };

  // submit marks
  const submitMarks = async () => {
    try {
      for (const subject of subjects) {
        await axios.post(
          `${API}/marks/give-marks`,
          {
            student_id: selectedStudent.id,
            subject_id: subject.id,
            marks: marksData[subject.id] || 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      toast.success("Marks saved successfully");

      setIsFormOpen(false);

      setMarksData({});
    } catch (err) {
      console.log(err);
      toast.error("Error saving marks");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-[#8E2C4A]">My Students</h1>

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <div className="grid gap-3">
          {students.map((student) => (
            <div key={student.id} className="border p-3 rounded shadow w-80">
              <h2 className="font-semibold">{student.name}</h2>

              <p className="text-gray-600">{student.email}</p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-[#8E2C4A]">
                  Class: {student.class_name}
                </p>

                <button
                  onClick={() => openMarksForm(student)}
                  className="bg-[#8E2C4A] px-3 py-1 rounded text-white"
                >
                  Give Marks
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MARKS FORM */}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-[#8E2C4A]">Give Marks</h2>

            <p className="mb-4 text-sm text-gray-600">
              Student: {selectedStudent?.name}
            </p>

            <div className="space-y-3">
              {subjects.map((subject) => (
                <div key={subject.id}>
                  <label className="block font-medium mb-1 text-[#8E2C4A]">
                    {subject.subject_name}
                  </label>

                  <input
                    type="number"
                    placeholder="Enter marks"
                    value={marksData[subject.id] || ""}
                    onChange={(e) =>
                      handleMarksChange(subject.id, e.target.value)
                    }
                    className="border p-2 rounded w-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsFormOpen(false)}
                className="bg-gray-400 px-3 py-1 rounded text-white"
              >
                Cancel
              </button>

              <button
                onClick={submitMarks}
                className="bg-[#8E2C4A] px-3 py-1 rounded cursor-pointer text-white"
              >
                Save Marks
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Marks;
