import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Trash2 } from "lucide-react";

const Notice = () => {
  const [notices, setNotices] = useState([]);

  //inputFields usestates
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noticeFrom, setNoticeFrom] = useState("");

  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem("token");

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

  const postNoticeHandler = async () => {
    try {
      if (!title || !description || !noticeFrom) {
        toast.error("Fill all given Fields");
      }

      const res = await axios.post(
        `${API}/post-notice`,
        {
          title,
          description,
          noticeFrom,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Added Notice Successfully!!");
        setNotices(res.data.notice);
        setTitle("");
        setDescription("");
        setNoticeFrom("");
        fetchNotices();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNoticeHandler = async (id) => {
    try {
      const res = await axios.delete(`${API}/delete-notice/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        toast.success("Notice deleted");

        // update UI without refetch
        setNotices((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete notice");
    }
  };
  return (
    <div className="flex flex-col gap-10">
      {/*POST NOTICE FROM HERE */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <label>Notice Title:</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Notice Title"
            className="border w-[350px] rounded-xl p-2"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label>Description:</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Notice Title"
            className="border w-[350px] rounded-xl p-2"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label>Notice From:</label>
          <input
            onChange={(e) => setNoticeFrom(e.target.value)}
            value={noticeFrom}
            type="text"
            placeholder="Notice from (eg: principle, admin,....)"
            className="border w-[350px] rounded-xl p-2"
          />
        </div>

        <button
          onClick={postNoticeHandler}
          type="submit"
          className="bg-[#8E2C4A] w-[350px] rounded-xl text-white cursor-pointer mt-4 p-2"
        >
          Post Notice
        </button>
      </div>

      {/*Notices from Db we have called fetchNotice after sumbition so that the notice gets
        refreshed after notice added */}
      <h1 className="w-full bg-gray-900 p-4 rounded font-bold text-2xl text-white">
        All Notices{" "}
      </h1>
      {Array.isArray(notices) && notices.length === 0 ? (
        <p>No notices found</p>
      ) : (
        Array.isArray(notices) &&
        notices.map((notice) => (
          <div key={notice.id}>
            {/*MAPPED NOTICES  */}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl text-[#8E2C4A] font-semibold">{notice.title}</h2>
                <p className="text-sm  text-gray-600">{notice.description}</p>
                <p className="text-sm  text-gray-900">
                  From: {notice.notice_from}
                </p>
                <p className="text-sm mt-2 text-gray-900">
                  {new Date(notice.created_at).toLocaleString()}
                </p>
              </div>

              <Trash2 onClick={()=>deleteNoticeHandler(notice.id)} size={25} className="text-red-500 cursor-pointer" />
            </div>
            <hr />
          </div>
        ))
      )}

      <ToastContainer />
    </div>
  );
};

export default Notice;
