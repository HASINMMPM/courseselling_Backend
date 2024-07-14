import express from "express";
import {
  signup,
  instructorLogin,
  allInstructors,
  deleteInstructor,
} from "../controller/instructorController.js";

const InstructorRouter = express();

InstructorRouter.post("/signup", signup);
InstructorRouter.post("/login", instructorLogin);
InstructorRouter.get("/all", allInstructors);
InstructorRouter.delete("/delete/:id", deleteInstructor);

export default InstructorRouter;
