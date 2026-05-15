import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {adminOnly} from '../middleware/roleMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'
import { createExamController, getExamClassController, getExamSubjectsController,getExamNoticesController } from '../controller/examController.js';


const examRouter = express.Router();

examRouter.post('/create-exam', authMiddleware, adminOnly, upload.single("notice_file"), createExamController);
examRouter.get('/exam-classes', authMiddleware, adminOnly, getExamClassController);
examRouter.get('/subjects/:class_name', authMiddleware,getExamSubjectsController)


examRouter.get("/my-exam-notices",  authMiddleware, getExamNoticesController);

export default examRouter;