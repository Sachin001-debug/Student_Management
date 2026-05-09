import express from "express";
import { getTeachersController, getStudentsController } from "../controller/roleBasedAccessController.js";
import {adminOnly} from '../middleware/roleMiddleware.js'
import authMiddleware from '../middleware/authMiddleware.js'
const roleRouter = express.Router();

roleRouter.get("/teachers", authMiddleware, adminOnly, getTeachersController);
roleRouter.get("/students", authMiddleware, getStudentsController);

export default roleRouter