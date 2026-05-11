import express from 'express'
import { assignStudentClassController, assignTeacherClassController } from '../controller/asssignUserController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {adminOnly} from '../middleware/roleMiddleware.js'


const assignRouter = express.Router();

assignRouter.post('/student', authMiddleware, adminOnly, assignStudentClassController);
assignRouter.post('/teacher', authMiddleware, adminOnly, assignTeacherClassController);

export default assignRouter