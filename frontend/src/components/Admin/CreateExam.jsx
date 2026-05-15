import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreateExam = () => {
  const [className, setClassName] = useState("");
  const [examClasses, setExamClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [noticeFile, setNoticeFile] = useState(null);

  const [preiview, setPreview] = useState(false);

  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  // fetch all exam classes
  const fetchExamClasses = async () => {
    try {
      const res = await axios.get(`${API}/exam-classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setExamClasses(res.data.examClasses);
      }
    } catch (err) {
      console.log("failed to fetch exam classes", err);
    }
  };

  useEffect(() => {
    fetchExamClasses();
  }, []);

  // create exam
  const createExamHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("class_name", className);
      formData.append("notice_file", noticeFile);

      const res = await axios.post(`${API}/create-exam`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);

        fetchExamClasses();

        setClassName("");
        setNoticeFile(null);
        setPreview(false);
      }
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed to create exam");
    }
  };

  // fetch subjects according to class
  const fetchExamSubjects = async (className) => {
    try {
      const res = await axios.get(`${API}/subjects/${className}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubjects(res.data.subjects);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* FORM */}
      <form
        onSubmit={createExamHandler}
        className="flex flex-col gap-4 max-w-md"
      >
        <h1 className="text-xl font-semibold">
          Create Exam by providing class
        </h1>

        <input
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#8E2C4A]"
          required
          placeholder="Enter Class Name (9, 10, Bsc, Msc)..."
        />

        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setNoticeFile(file);
          }}
          className="border p-2 rounded cursor-pointer"
          accept=".pdf,.jpg,.jpeg,.png" // ← Recommended
          required
        />

        <button
          type="submit"
          className="bg-[#8E2C4A] text-white p-3 rounded hover:bg-[#6E1A37]"
        >
          Create Exam
        </button>
      </form>

      {/* NOTE */}
      <h1 className="mt-12 text-xl font-semibold">Note:</h1>

      <p className="max-w-[420px] text-gray-600 mt-2">
        After setting class, subjects according to class will be displayed
        automatically to teacher and student dashboards.
      </p>

      {/* EXAM CLASSES */}
      <div className="mt-10">
        <h1 className="text-xl font-semibold mb-4">Exam Classes</h1>

        <div className="flex flex-wrap gap-3">
          {examClasses.map((exam) => (
            <button
              key={exam.id}
              onClick={() => fetchExamSubjects(exam.class_name)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              {exam.class_name}
            </button>
          ))}
        </div>
      </div>

      {/* SUBJECTS */}
      <div className="mt-10">
        <h1 className="text-xl font-semibold mb-4">Subjects</h1>

        <div className="flex flex-wrap gap-3">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="bg-[#8E2C4A] text-white px-4 py-2 rounded"
            >
              {sub.subject_name}
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default CreateExam;
