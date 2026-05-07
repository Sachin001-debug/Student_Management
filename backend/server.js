import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {createUserTable} from './models/userModel.js'
import userRouter from './routes/userRoutes.js';

dotenv.config(); 

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())


app.use(express.json());


createUserTable();
app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});