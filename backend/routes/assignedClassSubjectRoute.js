import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { studentSubjectstController, teacherSubjectstController } from '../controller/assignedClassSubjectController.js';

const assignedSubjectRouter = express.Router();

//get subs according to class and assigned for student and teacher respectively
assignedSubjectRouter.get('/student', authMiddleware, studentSubjectstController);
assignedSubjectRouter.get('/teacher', authMiddleware, teacherSubjectstController) 

export default assignedSubjectRouter