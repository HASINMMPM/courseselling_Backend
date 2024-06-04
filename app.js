const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")
const dotenv =require('dotenv')
const userRouter = require("./routes/UserRouter")

dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json()) 
app.use("/api/v1",userRouter) 



main().then(
    console.log("Connected"))
    .catch(err => console.log(err));

async function main() {
    connectionstring = process.env.DB_string 
  await mongoose.connect(connectionstring);
}







 
// app.use(express.json())
// app.use("/api/v1",userRouter) // "/api/v1" version config cheyya
