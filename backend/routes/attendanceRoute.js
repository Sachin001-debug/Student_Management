
import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { markAttendanceController } from '../controller/attendanceController.js';

const attendanceRouter =  express.Router();


attendanceRouter.post('/mark', authMiddleware, markAttendanceController);


export default attendanceRouter;