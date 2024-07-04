import express from 'express'
import { signup } from '../controller/userController.js'
const userRouter = express.Router()

userRouter.post('/signup', signup)

export default userRouter