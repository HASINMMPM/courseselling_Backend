import express from "express";
import {
  allUsers,
  deleteUser,
  login,
  signup,
  updateUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/allusers", allUsers);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
