import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
     name:{
          type:String,
          requried:true,
          trim:true
     },
     fatherName:{
          type:String,
          requried:true,
          trim:true
     },
     age:{
          type:String,
          requried:true,
          trim:true
     },
     grade:{
          type:String,
          requried:true,
          trim:true
     },
     rollNumber:{
          type:String,
          requried:true,
          trim:true
     },
     address:{
          type:String,
          requried:true,
          trim:true
     },
     photo:{
          data: Buffer,
          contentType: String,
          
     },
     slug:{
          type:String,          
     },
     fee:{
          type:String,
          requried:true,
          trim:true
     },
     phone:{
          type:String,
          requried:true,
          trim:true
     },
     created_at: {
          type: Date,
          default: Date.now
      },
     role:{
          type:Number,
          default:1,
     }
});

export default mongoose.model('Student',studentSchema);


