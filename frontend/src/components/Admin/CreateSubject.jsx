import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CreateSubject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  const createSubjectHandler = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!subjectName || !subjectCode || !className) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API}/subject/create`, // Fixed endpoint
        {
          subject_name: subjectName,  
          subject_code: subjectCode,  
          class: className,           
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  //for sussfull execution
      if (data.success) {
        toast.success(data.message || "Subject created successfully!");
        
        // Clear form
        setSubjectName("");
        setSubjectCode("");
        setClassName("");
      } else {
        toast.error(data.message || "Failed to create subject");
      }

    } catch (err) {
      console.error("Error creating subject:", err);
      
      if (err.response?.status === 401) {
        toast.error("Please login again");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error creating subject. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Create New Subject</h2>
      
      <form onSubmit={createSubjectHandler} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#8E2C4A]"
          required
        />

        <input
          type="text"
          placeholder="Subject Code"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#8E2C4A]"
          required
        />

        <input
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#8E2C4A]"
          required placeholder="Enter Class Name(9, 10, Bsc, Msc)...."
        >
       
        </input>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#8E2C4A] text-white p-3 rounded hover:bg-[#6E1A37] transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Subject"}
        </button>
      </form>
       
       <h1 className=" text-2xl font-bold mt-15">Note</h1>
       <div className="text-sm text-gray-700 mt-2" >
      <h1>Admin can add Subjct to any subject and class. <span className="font-semibold text-[#8E2C4A]">Be responsible while adding subjects in classes.</span> </h1> 
      <h2>You can always delete or edit from <span className="text-[#8E2C4A]">Manage Subjects</span>.</h2>
       </div>
      <ToastContainer/>
    </div>
  );
};

export default CreateSubject;