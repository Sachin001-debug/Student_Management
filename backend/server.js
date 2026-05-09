import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {createUserTable} from './models/userModel.js'
import userRouter from './routes/userRoutes.js';
import subjectRouter from './routes/subjectRoute.js';;
import { createSubjectTable } from './models/subjectModel.js';

dotenv.config(); 

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())


app.use(express.json());

//Tables endpoints
createUserTable();    //users table contains all users
createSubjectTable()   //have sub list


//api endpoints
app.use('/api/user', userRouter); //login, rregister, change pass
app.use('/api/subject', subjectRouter)// create sub from teacher dashboard

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});