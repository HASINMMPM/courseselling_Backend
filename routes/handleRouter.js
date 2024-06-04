const userRouter = require("./UserRouter")


userRouter.use("/user",userRouter)


module.exports = userRouter
