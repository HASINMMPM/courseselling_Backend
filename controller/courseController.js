import { cloudinaryInstance } from "../config/cluodinary.js";
import Course from "../models/courseModel.js";
import Instructor from "../models/instructorModel.js";

// get all course
export const allCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      return res.status(404).send("No courses found");
    }
    res.send(courses);
  } catch (error) {
    console.log(error);
  }
};

// get course by id

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send("No course found");
    }
    res.send(course);
  } catch (error) {
    console.log(error);
  }
};

// create course

export const createCourse = async (req, res) => {
  try {
    console.log("hitted");
    if (!req.file) {
      return res.send("file is not visible");
    }
    cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err, "error");
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      // console.log("result= ",result)
      const imageUrl = result.url;
      const body = req.body;
      console.log(body);

      const { title, description, price, instructoremail } = req.body;

      const findInstructor = await Instructor.findOne({
        email: instructoremail,
      });

      if (!findInstructor) {
        return res.send("please add instructor");
      }

      const createCourse = new Course({
        title,
        description,
        price,
        instructor: findInstructor._id,
        image: imageUrl,
      });

      const newCourseCreated = await createCourse.save();
      if (!newCourseCreated) {
        return res.send("course is not created");
      }
      return res.send(newCourseCreated);
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.send("failed to create course");
  }
};

//   update

export const updateCourse = async (req, res) => {
  try {
    console.log("Updating");
    const id = req.params.id;
   
    const { title, description, price, instructoremail } = req.body;
    console.log("updating Course Body",req.body)
    const checkCourse = await Course.findOne({ _id: id });
    if (!checkCourse) {
      return res.status(404).send("Course not found");
    }
    const findInstructor = await Instructor.findOne({ email: instructoremail });
    if (!findInstructor) {
      return res.status(400).send("please add instructor");
    }
    console.log("id", id);
    const updatedCourse = await Course.findByIdAndUpdate(
      id,

      {
        title,
        description,
        price,
        instructor: findInstructor._id,
      },
      {
        new: true,
      }
    );
    if (!updatedCourse) {
      console.log("Notup");
      return res.send("Course is not updated");
    }
    console.log("up done");
    res.send("updated Course");
  } catch (error) {
    res.send(error);
  }
};

//   Delete

export const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteId = await Course.deleteOne({ _id: id });
    if (!deleteId) {
      return res.send("not deleted");
    }
    res.send("deleted course");
  } catch (error) {
    res.send(error);
  }
};
