import { useEffect, useState } from "react";
import axios from "axios";

const StudentsResult = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);


  const [percentage, setPercentage] = useState(0);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const [remark, setRemark] = useState("");

  const fetchResult = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/marks/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubjects(res.data.subjects || []);
      
      setPercentage(res.data.percentage || 0);

      //Remarks to the student
      const fetchedTotalMarks = res.data.percentage || 0;

      setSubjects(res.data.subjects || []);

      setPercentage(res.data.percentage || 0);

  
      if (fetchedTotalMarks < 32) {
        setRemark(
          "You have Failed the examination. Contact school for re-examination and work very hard. Good Luck.",
        );
      } else if (fetchedTotalMarks >= 32 && fetchedTotalMarks < 50) {
        setRemark(
          "Work Harder to achieve good marks! Need improvement. Good Luck.",
        );
      } else if (fetchedTotalMarks >= 50 && fetchedTotalMarks < 75) {
        setRemark("Good Job! Keep improving for better results. Good Luck!");
      } else if (fetchedTotalMarks >= 75 && fetchedTotalMarks < 90) {
        setRemark("Very Good! Your hard work has paid off. Keep it up.");
      } else {
        setRemark("Excellent Work! Teachers are proud of you.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-[#8E2C4A] mb-5">My Result</h1>

      {loading ? (
        <p>Loading...</p>
      ) : subjects.length === 0 ? (
        <p>No result available</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-collapse">
              <thead>
                <tr className="bg-[#8E2C4A] text-white">
                  <th className="border p-2">Subject</th>

                  <th className="border p-2">Code</th>

                  <th className="border p-2">Marks</th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((sub, index) => (
                  <tr key={index}>
                    <td className="border p-2">{sub.subject_name}</td>

                    <td className="border p-2">{sub.subject_code}</td>

                    <td className="border p-2">{sub.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 bg-gray-100 p-4 rounded">
         

            <h2 className="text-lg font-bold mt-2">
             Total Percentage: <span className="text-[#8E2C4A]">{percentage}%</span>
            </h2>

            {/*Remarks */}
            <div className="mt-10 flex gap-2 text-[#8E2C4A] text-2xl font-bold">
                Remarks:<p className="text-black text-lg font-normal italic text-gray-800">"{remark}"</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentsResult;
