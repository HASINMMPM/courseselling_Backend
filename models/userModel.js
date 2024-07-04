import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    lastName: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 20,
    }, 
    email: {
      type: String,
      required: true,
      minlength: 3,
    },
    hashPassword: {
      type: String,
      required: true, 
      minlength: 3,
      
    },
  },
  // { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default  User ;
