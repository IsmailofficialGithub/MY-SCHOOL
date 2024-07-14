import reportModel from "../models/reportModel.js";
import fs from "fs";
import studentModel from "../models/studentModel.js";
import { report } from "process";

// create notice
export const addReportController = async (req, res) => {
  try {
    const { condition, message, complain, studentId, notification } = req.fields;
    const { photo } = req.files;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Student Id is required",
      });
    }
    if (studentId) {
      const student = await studentModel.findById(studentId);
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
      error,
    });
  }
};

// get single report
export const getSingleReportController = async (req, res) => {
  try {
    const data = await reportModel.findOne({ studentId: req.params.sId }).select("-photo");
    if (data) {
      res.status(200).send({
        success: true,
        message: "SuccessFully getting report",
        data,
      });
    } else {
      res.status(206).send({
        success: true,
        message: "No report add For U",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in trycatch block",
      success: false,
      error,
    });
  }
};

// get all reports
export const getAllReportsController = async (req, res) => {
  try {
    const data = await reportModel.find().select("-photo");
    res.status(200).send({
      success: true,
      message: "successFully getting all reports",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in trycatch block",
      success: false,
      error,
    });
  }
};

// delete report
export const deleteReportController = async (req, res) => {
  try {
    const id = req.params.sId;
    const data = await reportModel.deleteMany({ studentId: id }).select("-photo");
    res.status(200).send({
      success: true,
      message: "successFully deleted report",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in trycatch block",
      success: false,
      error,
    });
  }
};

//checkingAvilabilityController

export const checkingAvilabilityController = async (req, res) => {
  try {
    const data = await reportModel.findOne({ studentId: req.params.sId }).select("-photo");
    if (!data) {
      res.status(200).send({
        success: true,
        data,
        message: "no data",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "already report is add ",
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// update report

export const updateReportController = async (req, res) => {
  try {
    const id = req.params.sId;
    const { condition, message, complain, studentId, notification } = req.fields;
    const { photo } = req.files;
    const updateData = { ...req.fields };
    if (photo) {
      updateData.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }
    const data = await reportModel.updateOne({ studentId: id }, updateData);
    res.status(200).send({
      success: true,
      message: "updated data successFully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error in trycatch block",
      error,
    });
  }
};


/// getting photo
export const gettingPhotoController=async(req,res)=>{
  try {
    const data=await reportModel.findOne({studentId:req.params.sId}).select('photo');
   
    if ( data?.photo.data) {
      res.set('Content-Type', data.photo.contentType);
      return res.status(200).send(data.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: 'No photo found for this student',
      });
    }

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'error in trycatch block ',
      error
    })
    
  }
}