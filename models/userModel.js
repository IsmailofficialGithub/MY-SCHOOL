import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
     userId:{
          type:String,
          require:true,
          unique:true
     },
     password:{
          type:String,
          require:true,
     },
     answer:{
          type:String,
          require:true,
     },
     created_at: {
          type: Date,
          default: Date.now
      },
      studentUserId:{
          type:mongoose.ObjectId,
          ref:"students",
     },
     role:{
          type:Number,
          default:0,
     }
})

export default mongoose.model('User',userSchema);