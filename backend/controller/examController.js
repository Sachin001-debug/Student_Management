import { createExamModel, getExamClassModel, getExamSubjectForClasses, getExamNoticesByRole } from "../models/examModel.js";
import pool from "../config/db.js";

export const createExamController = async (req, res) => {
  try {
    const { class_name } = req.body;

    //if notice file doesnt exists it stays null
    const notice_file = req.file ? `uploads/${req.file.filename}` : null;

    if (!class_name) {
      return res.status(400).json({
        success: false,
        message: "Class name is required",
      });
    }
    const exam = await createExamModel(class_name, notice_file);

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam,
    });
  } catch (err) {
    //if exam for this classs already exists
    if (err.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Exam for this class already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log("error in createcontroller", err);
  }
};

export const getExamClassController = async (req, res) => {
  try {
    const examClasses = await getExamClassModel();

    res.status(200).json({
      success: true,
      message: "Fetched exams successfully!",
      examClasses: examClasses,
    });
  } catch (err) {
    console.log("error lfetching exam classes", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch exam classes",
    });
  }
};


export const getExamSubjectsController = async (req, res) => {
  try {
    const { class_name } = req.params;

    const subjects = await getExamSubjectForClasses(class_name);

    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (err) {
    console.log("error getting exam subjects",err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch subjects",
    });
  }
};

//get exam notice 
export const getExamNoticesController = async (req, res) => {
  try {
    const userId = req.user.id;

    // ALWAYS get fresh user data from DB
    const userResult = await pool.query(
      `SELECT role, class_name, assigned_class
       FROM users
       WHERE id = $1`,
      [userId]
    );

    const user = userResult.rows[0];

    let notices;

    if (user.role === "student") {
      notices = await pool.query(
        `SELECT * FROM exams WHERE class_name = $1`,
        [user.class_name]
      );
    }

    else if (user.role === "teacher") {
      notices = await pool.query(
        `SELECT * FROM exams WHERE class_name = ANY($1)`,
        [user.assigned_class || []]
      );
    }

    else {
      notices = await pool.query(`SELECT * FROM exams`);
    }

    return res.status(200).json({
      success: true,
      notices: notices.rows,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
    });
  }
};