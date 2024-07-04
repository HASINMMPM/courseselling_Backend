import express from 'express'
import userRouter from './userRouter.js'

const v1Router = express.Router()

v1Router.use('/v1/user',userRouter)


export default v1Router