const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwtCreate");
const User = require("../model/userModel");

const signup = async (req, res) => {
  console.log("hitted");
  try {
    console.log(req.body);
    const { email, password, firstName, lastName } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.send("sry, User is already exist");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });

    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }
    const token = generateToken(email);
    res.cookie("token", token);
    res.send(token + "New user created ");
    console.log("newUserCreated");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.send("User not found");
    }
    const matchPassword = await bcrypt.compare(password, user.hashPassword);
    if (!matchPassword) {
      res.send("Incorrect password");
    }
    const token = generateToken(email);
    res.send(token);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = {
  signup,
  signin,
};
