import express from 'express'
import { allUsers, login, signup } from '../controller/userController.js'
const userRouter = express.Router()

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.get("/allusers",allUsers)

export default userRouter