import express from 'express'
import userRouter from './userRouter.js'
import InstructorRouter from './InstructorRouter.js'
import courseRouter from './courseRouter.js'

const v1Router = express.Router()

v1Router.use('/v1/user',userRouter)
v1Router.use('/v1/instructer' , InstructorRouter)
v1Router.use('/v1/course',courseRouter)


export default v1Router