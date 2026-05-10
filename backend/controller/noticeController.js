import {
  deleteNotice,
  getNotices,
  insertNotice,
} from "../models/noticeModel.js";

export const postNoticeHandler = async (req, res) => {
  try {
    const { title, description, noticeFrom } = req.body;

    // Validation if didnt get the data
    if (!title || !description || !noticeFrom) {
      return res.status(400).json({
        success: false,
        message: "Enter all fields!!",
      });
    }

    // Insert notice
    const newNotice = await insertNotice(title, description, noticeFrom);

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      notice: newNotice,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to create notice",
    });
  }
};

export const getNoticeHandler = async (req, res) => {
  try {
    const notices = await getNotices();

    res.status(200).json({
      success: true,
      message: "Fetched notices successfully!",
      notices,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
    });
  }
};

export const deletenoticeHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteNotice(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (err) {
    console.error("Error in deleteSubjectController:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete subject",
    });
  }
};
