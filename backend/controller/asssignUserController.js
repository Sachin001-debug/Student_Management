import { assignStudentModel, assignTeacherModel } from "../models/assignUserModel.js";

export const assignStudentClassController = async (req, res) => {
  try {
    const { student_id, class_name } = req.body;

    if (!student_id || !class_name) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const student = await assignStudentModel(
      student_id,
      class_name
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class assigned to student",
      student,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const assignTeacherClassController = async (req, res) => {
  try {
    const { teacher_id, assigned_class } = req.body;

    if (!teacher_id || !assigned_class) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const teacher = await assignTeacherModel(
      teacher_id,
      assigned_class
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class assigned to teacher",
      teacher,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};