import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { generateAccessToken } from "../utils/jwt.js";



const signup = async(req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(email)

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "user already exist" });
    }

    const saltRounds = 10;

     const hashPassword =await bcrypt.hash(password, saltRounds)

    
    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });


    // new user save
    const newUserCreation = await newUser.save()

    // if failed
    if(!newUserCreation){
       return res.status(400).json({ msg: "user not created" });
    }

    const token = generateAccessToken(email);
    res.cookie("token", token)
    res.send("welcome and enjoy")


  } catch (error) {
    console.log( error);
  }
};

    //    LOGing















    export {
    signup}