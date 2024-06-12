const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const cookieparser = require("cookie-parser");
// const cors = require('cors')

dotenv.config();
app.use(cookieparser());
// app.use(cors())
app.use(express.json());

app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main()
  .then(console.log("Connected"))
  .catch((err) => console.log(err));

async function main() {
  connectionstring = process.env.DB_string;
  await mongoose.connect(connectionstring);
}

// app.use(express.json())
// app.use("/api/v1",userRouter) // "/api/v1" version config cheyya
