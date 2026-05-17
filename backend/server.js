import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {createUserTable} from './models/userModel.js'
import userRouter from './routes/userRoutes.js';
import subjectRouter from './routes/subjectRoute.js';;
import { createSubjectTable } from './models/subjectModel.js';
import roleRouter from './routes/roleBasedAccessRoute.js';
import noticeRouter from './routes/noticeRoutes.js';
import { createNoticeTable } from './models/noticeModel.js';
import assignRouter from './routes/assignUserRoute.js';
import assignedSubjectRouter from './routes/assignedClassSubjectRoute.js';
import { createExamTable } from './models/examModel.js';
import examRouter from './routes/examRoute.js';
import { createAttendanceTable } from './models/attendanceModel.js';
import attendanceRouter from './routes/attendanceRoute.js';
import { createMarksTable } from './models/marksModel.js';
import marksRouter from './routes/marksRoute.js';

dotenv.config(); 

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())


app.use(express.json());
app.use("/uploads", express.static("uploads"));


//Tables endpoints
createUserTable();    //users table contains all users
createSubjectTable()   //have sub list
createNoticeTable(); //table for notices
createExamTable(); //table for exam
createAttendanceTable(); //table for attendance
createMarksTable(); //table store marks of students acc to subjs


//api endpoints
app.use('/api/user', userRouter); //login, rregister, change pass
app.use('/api/subject', subjectRouter)// create sub from admin dashboard, manage get and edit sub

 //we are using this route to get details of student or teacher and students to admina and st for teachers
app.use('/api', roleRouter); //get student and yeacher
app.use('/api', noticeRouter); //to get and post notices (admin:post)

app.use('/api/assign', assignRouter)// assign classes to teacher and stdent
app.use('/api/assigned/subjects', assignedSubjectRouter) // get subject for teaher and student

app.use('/api', examRouter); //exam creation and fetch exam notice too
app.use('/api/attendance', attendanceRouter); //atendance mark and get status

app.use('/api/marks', marksRouter) //to get insert, fun for marks 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});