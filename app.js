import express from 'express'
import 'dotenv/config'
const app = express()
const port = process.env.port
import connect from './config/serverConnection.js'
import v1Router from './router/allRouter.js'
import cookieParser from 'cookie-parser'



app.use(express.json());
app.use(cookieParser())
app.use("/",v1Router );



app.get('/', (req, res) => {
  res.send('Hello hasi!')
})

connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})