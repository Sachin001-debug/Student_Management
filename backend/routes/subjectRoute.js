import express from 'express'; 


import authMiddleware from "../middleware/authMiddleware.js";
import { createSubject, deleteSubjectController, getSubjectsByClassController, getAllClassesController} from "../controller/subjectController.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const subjectRouter = express.Router();

subjectRouter.get('/classes', authMiddleware, getAllClassesController);
subjectRouter.get('/class/:class', authMiddleware, getSubjectsByClassController);
subjectRouter.post('/create', authMiddleware, adminOnly, createSubject);
subjectRouter.delete('/:id', authMiddleware, adminOnly, deleteSubjectController);

export default subjectRouter;