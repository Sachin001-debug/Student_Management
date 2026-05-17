
import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { markAttendanceController,  getTodayAttendanceController } from '../controller/attendanceController.js';

const attendanceRouter =  express.Router();


attendanceRouter.post('/mark', authMiddleware, markAttendanceController);

attendanceRouter.get("/today", authMiddleware, getTodayAttendanceController);

export default attendanceRouter;