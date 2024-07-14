import Instructor from "../models/instructorModel.js";
import bcrypt from "bcrypt";
import adminToken from "../utils/adminToken.js";

const signup = async (req, res) => {
  try {
    const { fullName, email, password,role } = req.body;

    const checkInstructer = await Instructor.findOne({ email });
    if (checkInstructer) {
      return res.status(400).json( "user already exist" );
    } else {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);

      const newInstructor = new Instructor({
        fullName,
        email,
        hashPassword,
        role
      });
      const savedInstructor = await newInstructor.save();
      res.json(savedInstructor);
      if (!savedInstructor) {
        return res.status(400).json( "something went wrong, Try again");
      }
      const token = adminToken(savedInstructor);
      res.cookie("token", token);
      // res.send("Hey, wlcome again");
    }
  } catch (error) {
    console.log(error);
  }
};
const instructorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const instructor = await Instructor.findOne({ email });
    if (!instructor) {
      return res.status(400).json({ msg: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, instructor.hashPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid password" });
    }

    if (isMatch) {
     const token = adminToken(instructor);
      res.cookie("token", token);
      res.status(200).json({ msg: "loging Instructor success " });
    }
  } catch (error) {
    console.log(error);
  }
};
const allInstructors =async (req,res) =>{
  try {
    const instructors = await Instructor.find();
    if (!instructors) {
      return res.status(400).send("no instructors found");
    }
    res.send(instructors);
  } catch (error) {
    console.log(error);
  }
}
const deleteInstructor = async (req,res) =>{
  try {
    const { id } = req.params;
    const checkInstructer =await Instructor.findOne({_id:id});
    if (!checkInstructer) {
      return res.status(400).send("instructor not found");
    }
    const deletedInstructor = await Instructor.findByIdAndDelete(id);
    if (!deletedInstructor) {
      return res.status(400).send("instructor deletion failed");
    }
    res.send("deleted Instructor");
  } catch (error) {
    console.log(error);
  }
}

export { instructorLogin, signup,allInstructors,deleteInstructor };
