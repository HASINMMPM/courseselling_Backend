const jwt = require('jsonwebtoken');
const dotenv =require('dotenv')

const secreatKey = process.env.secKey
const generateToken = (email) =>{
    return jsonwebTocken({data:email}, secretKey,{expriresIn : "1d" })
}  