import express from "express";
import { signup,  instructorLogin } from "../controller/instructorController.js";


const InstructorRouter = express();

InstructorRouter.post('/signup',signup)
InstructorRouter.post('/login',instructorLogin)


export default InstructorRouter;