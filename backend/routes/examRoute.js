import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {adminOnly} from '../middleware/roleMiddleware.js'
import { createExamController, getExamClassController, getExamSubjectsController } from '../controller/examController.js';


const examRouter = express.Router();

examRouter.post('/create-exam', authMiddleware, adminOnly, createExamController);
examRouter.get('/exam-classes', authMiddleware, adminOnly, getExamClassController);
examRouter.get('/subjects/:class_name', authMiddleware,getExamSubjectsController)


export default examRouter;