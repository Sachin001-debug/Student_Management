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
        // Redirect to login if needed
        // navigate('/login');
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

        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#8E2C4A]"
          required
        >
          <option value="">Select Class</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 2">Class 2</option>
          <option value="Class 3">Class 3</option>
          <option value="Class 4">Class 4</option>
          <option value="Class 5">Class 5</option>
          <option value="Class 6">Class 6</option>
          <option value="Class 7">Class 7</option>
          <option value="Class 8">Class 8</option>
          <option value="Class 9">Class 9</option>
          <option value="Class 10">Class 10</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#8E2C4A] text-white p-3 rounded hover:bg-[#6E1A37] transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Subject"}
        </button>
      </form>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateSubject;