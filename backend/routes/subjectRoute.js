import express from 'express'; 


import authMiddleware from "../middleware/authMiddleware.js";
import { createSubject, deleteSubjectController, getSubjectsByClassController, getAllClassesController, editSubjectController, getSubjectsForTeacherController} from "../controller/subjectController.js";
import { adminOnly, teacherOnly } from "../middleware/roleMiddleware.js";

const subjectRouter = express.Router();

//get method to get all classes (used in manage clases)
subjectRouter.get('/classes', authMiddleware, getAllClassesController);
subjectRouter.get('/class/:class', authMiddleware, getSubjectsByClassController);

//create subject and delete sub kby  the sub
subjectRouter.post('/create', authMiddleware, adminOnly, createSubject);
subjectRouter.delete('/:id', authMiddleware, adminOnly, deleteSubjectController);

//updates subject data from admin pannel (adminonly);
subjectRouter.put('/edit-subject', authMiddleware, adminOnly, editSubjectController);

subjectRouter.get('/teacher-subjects', authMiddleware, teacherOnly, getSubjectsForTeacherController)

export default subjectRouter;