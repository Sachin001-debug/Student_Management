import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getStudentMarksController,
  giveMarksController,
  getSubjectsForStudent,
  getResultController,
} from "../controller/marksController.js";

const marksRouter = express.Router();

//get Result of student by student id
marksRouter.get('/student', authMiddleware, getResultController)


// get subjects according to class
marksRouter.get( "/subjects/:class_name", authMiddleware,  getSubjectsForStudent);

// give marks
marksRouter.post( "/give-marks", authMiddleware, giveMarksController);

// get marks of student
marksRouter.get( "/student/:student_id", authMiddleware, getStudentMarksController);
export default marksRouter;