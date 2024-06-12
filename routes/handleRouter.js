const userRouter = require("./userRouter");

userRouter.use("/user", userRouter);

module.exports = userRouter;
