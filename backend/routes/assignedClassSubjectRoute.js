import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { studentSubjectstController } from '../controller/assignedClassSubjectController.js';

const assignedSubjectRouter = express.Router();
//get subs according to class and assigned for student and teacher respectively
assignedSubjectRouter.get('/student', authMiddleware, studentSubjectstController); 

export default assignedSubjectRouter