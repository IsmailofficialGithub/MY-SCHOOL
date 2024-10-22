import mongoose from 'mongoose'

const reportSchema=new mongoose.Schema({

     condition:{
          type:String,
          default:"Good",
          enum:["Excelent","Good","Average","Bad","Worst"]
     },
     photo:{
          data:Buffer,
          ContentType:String
     },
     message:{
          type:String,
          trim:true,
     },
     complain:{
          type:String,
          trim:true
     },
     studentId:{
          type:mongoose.ObjectId,
          ref:"students",
          required:true,
     },
     notification:{
          type:String,
          trim:true
     },
},
{ timestamps: true }
)

export default mongoose.model('Report',reportSchema);