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

dotenv.config(); 

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())


app.use(express.json());

//Tables endpoints
createUserTable();    //users table contains all users
createSubjectTable()   //have sub list
createNoticeTable(); //table for notices


//api endpoints
app.use('/api/user', userRouter); //login, rregister, change pass
app.use('/api/subject', subjectRouter)// create sub from admin dashboard, manage get and edit sub

 //we are using this route to get details of student or teacher and students to admina and st for teachers
app.use('/api', roleRouter);
app.use('/api', noticeRouter); //to get and post notices (admin:post)

app.use('/api/assign', assignRouter)// assign classes to teacher and stdent
app.use('/api/assigned/subjects', assignedSubjectRouter) // get subject for teaher and student

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});