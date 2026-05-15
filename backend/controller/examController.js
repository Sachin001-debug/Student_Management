import { createExamModel, getExamClassModel, getExamSubjectForClasses } from "../models/examModel.js";
import pool from "../config/db.js";

export const createExamController = async (req, res) => {
  try {
    const { class_name } = req.body;

    if (!class_name) {
      return res.status(400).json({
        success: false,
        message: "Class name is required",
      });
    }
    const exam = await createExamModel(class_name);

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

//creating table so that each sub in each class wil, have date of exam 
