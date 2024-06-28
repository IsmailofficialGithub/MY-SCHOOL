import reportModel from "../models/reportModel.js";
import fs from "fs";
import studentModel from "../models/studentModel.js";


// create notice 
export const addReportController = async (req, res) => {
     console.log("2");
  try {
    console.log("1");
    const { condition, message, complain, studentId, notification } = req.fields;
    const { photo } = req.files;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Student Id is required",
      });
    }
    if (studentId) {
      const student  = await studentModel.findById(studentId);
      if (!student) {
        return res.status(400).send({
          success: false,
          message: "Invalid Student Id ",
        });
      }
    }

    const notice = new reportModel({ ...req.fields });
    if (photo) {
      notice.photo.data = fs.readFileSync(photo.path);
      notice.photo.ContentType = photo.type;
    }

    await notice.save();
    res.status(200).send({
      success: true,
      message: "add data",
      notice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in trycatch block",
      success: false,
      error
    });
  }
};


// get single report  
export const getSingleReportController=async(req,res)=>{
     try {
          const data=await reportModel.find({studentId:req.params.sId}).select('-photo');
          if(data.length>=1){
               res.status(200).send({
                    success:true,
                    message:'successFully getting report',
                    data
               })
          }else{
               res.status(400).send({
                    success:true,
                    message:'No report add For U'
               })
          }
     } catch (error) {
          console.log(error);
          res.status(500).send({
            message: "error in trycatch block",
            success: false,
            error
          });
          
     }

}

// get all reports
export const getAllReportsController=async(req,res)=>{
     try {
          const data=await reportModel.find().select('-photo')
          res.status(200).send({
               success:true,
               message:'successFully getting all reports',
               data
          })
          
     } catch (error) {
          console.log(error);
    res.status(500).send({
      message: "error in trycatch block",
      success: false,
      error
    });
          
     }
}


// delete report
export const deleteReportController=async(req,res)=>{
     try {
          const id=req.params.sId;
          const data=await reportModel.findByIdAndDelete(id).select('-photo');
          res.status(200).send({
               success:true,
               message:'successFully deleted report',
               data
          })
          
     } catch (error) {
          console.log(error);
    res.status(500).send({
      message: "error in trycatch block",
      success: false,
      error
    });
          
     }
}

//checkingAvilabilityController

export const checkingAvilabilityController=async(req,res)=>{
     try {
          const data=await reportModel.find({studentId:req.params.sId}).select('-photo')
          if(data.length>0){
               return res.status(300).send({
                    success:false,
                    message:'already report is added',
                    data
               })
          }else{
               res.status(200).send({
                    success:true,
                    message:'you can add report '
               })
          }
     } catch (error) {
          console.log(error)
          
     }
}