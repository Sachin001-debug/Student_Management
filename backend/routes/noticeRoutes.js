import express from 'express'
import {adminOnly} from '../middleware/roleMiddleware.js'
import { deletenoticeHandler, getNoticeHandler, postNoticeHandler } from '../controller/noticeController.js';
import authMiddleware from '../middleware/authMiddleware.js'
const noticeRouter = express.Router();

noticeRouter.post('/post-notice',authMiddleware, adminOnly, postNoticeHandler);
noticeRouter.get('/notices',authMiddleware, getNoticeHandler);
noticeRouter.delete('/delete-notice/:id', authMiddleware, adminOnly, deletenoticeHandler)

export default noticeRouter;