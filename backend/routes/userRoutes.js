
import express from 'express'
import  { registerUser, loginUser, getUser, changePassword } from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const  userRouter = express.Router();

userRouter.post('/login', loginUser); //login route
userRouter.post('/register', registerUser);  //register route
userRouter.get('/me', authMiddleware, getUser); //to get user detail and fetch in profile
userRouter.put('/change-password', authMiddleware, changePassword); ///to change passworrd

export default userRouter;