import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/jwt.js";

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(email);

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "user already exist" });
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });

    // new user save
    const newUserCreation = await newUser.save();

    // if failed
    if (!newUserCreation) {
      return res.status(400).json({ msg: "user not created" });
    }

    const token = generateAccessToken(email);
    res.cookie("token", token);
    res.send("welcome and enjoy");
  } catch (error) {
    console.log(error);
  }
};

//    LOGing

const login = async (req, res) => {
  // console.log("work")
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.hashPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid password" });
    }
    if (isMatch) {
      const token = generateAccessToken(email);
      res.cookie("token", token);
      res.send("Hey, we met already");
    }
  } catch (error) {
    console.log(error);
  }
};

// ALL USER

const allUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.send("cant find users");
  }
  res.send(users);
};

// UPDATE USER

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;
  console.log("id: " + id);
  const checkUser = await User.findOne({ _id: id });
  if (!checkUser) {
    return res.status(404).json({ msg: "Sry, User not found" });
  }
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
      password,
    },
    { new: true }
  );
  console.log("updateuser : " + updateUser);

  if (!updateUser) {
    return res.status(404).json({ msg: "Sry, updation failed" });
  }

  res.send(updateUser);
};

// DELETE USER

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id + "id");
  const checkUser = await User.findOne({ _id: id });
  if (!checkUser) {
    return res.status(404).json({ msg: "Sry, User not found for delete" });
  }

  const deleteUser = await User.findByIdAndDelete(id);

  if (!deleteUser) {
    return res.status(404).json({ msg: "Sry, deletion failed" });
  }

  res.send("User deleted successfully");
};

export { signup, login, allUsers, updateUser, deleteUser };
