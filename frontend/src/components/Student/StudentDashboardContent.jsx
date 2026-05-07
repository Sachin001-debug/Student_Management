import { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboardContent = () => {
  const API = import.meta.env.VITE_API;

  const [user, setUser] = useState("");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      const res = await axios.get(`${API}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">
        Welcome <span className="text-[#8E2C4A]">{user.name}</span>
      </h1>
    </div>
  );
};

export default StudentDashboardContent;