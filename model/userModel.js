const mongoose =require ('mongoose');
// const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        minlength: 3,
        uppercase: true
        
    },
    lastName:{
        type : String,
        required : true,
        minlength :  3,
        uppercase : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type :  String,
        required : true
    }
         });

const User = mongoose.model('User', userSchema);
module.exports = User

        