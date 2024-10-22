import userModel from "../models/userModel.js";
import teacherModel from "../models/teacherModel.js";
import studentModel from "../models/studentModel.js";
import noticeModel from "../models/noticeModel.js";
import reportModel from "../models/reportModel.js";

export const adminAllController = async (req, res) => {
  try {
    const getUser = await userModel.find();
    const getTeacher = await teacherModel.find().select("-photo -idCard");
    const getStudent = await studentModel.find().select("-photo -idCard");
    const getNotice = await noticeModel.find().select("-photo -idCard");
    const getReport = await reportModel.find().select("-photo -idCard");

    let userLength = getUser.length;
    let teacherLength = getTeacher.length;
    let studentLength = getStudent.length;
    let noticeLength = getNotice.length;
    let reportLength = getReport.length;

    console.log(userLength, teacherLength, studentLength, noticeLength, reportLength);
    res.status(200).send({
      success: true,
      message: "successFully getting all lengths",
      length: {
        userLength,
        teacherLength,
        studentLength,
        noticeLength,
        reportLength,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in trycatch block",
      error: error.message,
    });
  }
};

export const allUserController=async(req,res)=>{
  try {
    const data=await userModel.find().select("-password")
    res.status(200).send({
      success:true,
      message:"success fully getting data",
      data
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in trycatch block",
      error:error.message
    })
    
  }

}