import {
  giveMarksModel,
  getStudentMarksModel,
  getResultByStudentId,
} from "../models/marksModel.js";

import { getSubjectsByClass } from "../models/subjectModel.js";

// get subjects according to class
export const getSubjectsForStudent = async (req, res) => {
  try {
    const { class_name } = req.params;

    const subjects = await getSubjectsByClass(class_name);

    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// give marks
export const giveMarksController = async (req, res) => {
  try {
    const { student_id, subject_id, marks } = req.body;

    if (!student_id || !subject_id || marks === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const saved = await giveMarksModel(student_id, subject_id, marks);

    res.status(201).json({
      success: true,
      message: "Marks saved",
      saved,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get marks
export const getStudentMarksController = async (req, res) => {
  try {
    const { student_id } = req.params;

    const marks = await getStudentMarksModel(student_id);

    res.status(200).json({
      success: true,
      marks,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//get result  for student by st.id

export const getResultController = async (req, res) => {
  try {
    const  student_id  = req.user.id;

    if (!student_id) {
     return res.json({ success: false, message: "Student id in valid" });
    }

    const result = await getResultByStudentId(student_id);

    let totalMarks = 0;

      result.forEach((item) => {
      totalMarks += Number(item.marks);
    });

    //calculating percentage of the result
    const percentage = result.length > 0? (
            totalMarks /(result.length * 100)) * 100
            : 0;

    res.status(200).json({
      success: true,
      subjects: result,
      percentage: percentage.toFixed(2),
    });
  } catch (err) {
    console.error("Error in getResultController:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get student result",
    });
  }
};
