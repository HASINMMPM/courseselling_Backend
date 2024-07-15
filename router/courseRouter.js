import express from "express";
import {
  allCourse,
  createCourse,
  deleteCourse,
  getCourseById,
  updateCourse,
} from "../controller/courseController.js";
import upload from "../middlewares/multer.js";
import { authAdmin } from "../middlewares/adminAuth.js";

const courseRouter = express.Router();

courseRouter.post("/add", upload.single("image"), createCourse);
courseRouter.get("/all",authAdmin, allCourse);
courseRouter.get("/:id", getCourseById);
courseRouter.delete("/delete/:id", deleteCourse);
courseRouter.put ("/edit/:id",updateCourse)

export default courseRouter;
