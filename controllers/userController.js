const bcrypt = require('bcrypt');
const generateToken = require('../utils/user');
const  JsonWebToken  = require('jsonwebtoken');
const User = require('../model/userModel')

const signUP = async (req, res) =>{
    try {
        const {firstName , lastName, email , password} = req.body
        const userExist = await User.find ({email})
        if (userExist){
            return res.send("User already existed")
        }
            const saltRounds = 10
            const hashPassword = await bcrypt.hash(password,saltRounds)

            // Create new User
            const newUser = new User({
                firstName,
                lastName,
                email,
                password
            })
            if(!newUser){
                return res.send("Failed creation")
            }
            const token = JsonWebToken(email)
            res.send(token)
             
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

const signIn = async (req, res) => {
    try {
        const {email , password} = req.body
        const user = await User.findOne({email});
        if(!user){
            res.send("User not found")
        }
        const matchPassword = await bcrypt.compare (password , user.hashPasword)   
        if(!matchPassword){
            res.send("Incorrect password")
        }
        const token =generateToken(email)
        res.send(token)
        }


        
     catch (error) {
        console.log(error)
        return res.send(error)
    }
}

module.exports = 
{
    signUP, signIn
}
