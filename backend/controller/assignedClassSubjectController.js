import { getSubjectsForStudent, getSubjectForTeacher } from "../models/assignedClassSubjectModel.js";

export const studentSubjectstController = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(401).json({ success: false, message: "Login first" });
    }

    const subjects = await getSubjectsForStudent(id);

    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      subjects,
      count: subjects.length
    });

  } catch (err) {
    console.error("Controller Error:", err.message);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch subjects",
    });
  }
};

export const teacherSubjectstController = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(401).json({ success: false, message: "Login first" });
    }

    const subjects = await getSubjectForTeacher(id);

    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      subjects,
      count: subjects.length
    });

  } catch (err) {
    console.error("Controller Error:", err.message);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch subjects",
    });
  }
};