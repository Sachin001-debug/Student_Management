import { useEffect, useState } from "react";
import axios from "axios";

const TeacherExam = () => {
  const [examNotices, setExamNotice] = useState([]);

  const API = import.meta.env.VITE_API;
  const baseApi = import.meta.env.VITE_URL

  const token = localStorage.getItem("token");

  // fetch notices
  const fetchNotices = async () => {
    try {
      const res = await axios.get(
        `${API}/my-exam-notices`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExamNotice(res.data.notices);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-[#8E2C4A]">
       Recent Exam Notices
      </h1>

      <p className="mb-4 text-lg">Exam notice are displayed according to the assigned class given by admin.</p>

      {examNotices.length === 0 ? (
        <p>No exam notices available</p>
      ) : (
        <div className="grid gap-4">
          {examNotices.map((notice) => (
            <div
              key={notice.id}
              className="border rounded p-4 shadow"
            >
              <h2 className="text-lg font-semibold text-[#8E2C4A]">
                Class {notice.class_name}
              </h2>

              <p>Exam notice has been published for class {notice.class_name}. View Notice from the link below</p>

              {notice.notice_file && (
                <a
                  href={`${baseApi}/${notice.notice_file}`}
                  target="_blank"
                  download
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Notice
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherExam;