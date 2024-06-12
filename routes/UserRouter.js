// const express = require("express")
// const router =express.Router()
// const userController = require("../controllers/userController")



// router.post("/signup",userController.signUp)



// module.exports =router

const express = require ("express");
const { signup, signin } = require ("../controllers/userControllers.js");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

module.exports = userRouter