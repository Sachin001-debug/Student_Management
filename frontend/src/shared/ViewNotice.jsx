import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ViewNotice = () => {
  const [notices, setNotices] = useState([]);

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

  // FETCH NOTICES
  const fetchNotices = async () => {
    try {
      const res = await axios.get(`${API}/notices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setNotices(res.data.notices);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error fetching notices");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // DELETE NOTICE
  const deleteNoticeHandler = async (id) => {
    try {
      const res = await axios.delete(`${API}/delete-notice/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        toast.success("Notice deleted successfully");

        // remove from UI instantly
        setNotices((prev) => prev.filter((notice) => notice.id !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete notice");
    }
  };

  return (
    <>
      <h1 className="w-full bg-gray-900 p-4 rounded font-bold text-2xl text-white">
        All Notices
      </h1>

      {Array.isArray(notices) && notices.length === 0 ? (
        <p className="mt-4">No notices found</p>
      ) : (
        Array.isArray(notices) &&
        notices.map((notice) => (
          <div key={notice.id} className="p-3">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h2 className="text-2xl text-[#8E2C4A] font-semibold">
                  {notice.title}
                </h2>

                <p className="text-sm text-gray-600">
                  {notice.description}
                </p>

                <p className="text-sm text-gray-900">
                  From: {notice.notice_from}
                </p>

                <p className="text-sm mt-2 text-gray-900">
                  {new Date(notice.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <hr className="mt-2" />
          </div>
        ))
      )}

      <ToastContainer />
    </>
  );
};

export default ViewNotice;