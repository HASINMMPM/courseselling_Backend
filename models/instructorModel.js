import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 30,
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
    role: {
        type: String,
        required: true,
       
        enum: ["instructor", "admin"],
        
    }
  },
  // { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
export default  Instructor ;
