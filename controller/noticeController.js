import noticeModel from "../models/noticeModel.js";
import slugify from "slugify";
import fs from "fs";


// create notice
export const addNoticeController = async (req, res) => {
  try {
    const { title, description, date, catagory } = req.fields;
    const { photo } = req.files;

    if (!title || !description || !catagory) {
      return res.status(300).send({
        success: false,
        message: "title description and catagory is required",
      });
    }

    const notice = new noticeModel({ ...req.fields, slug: slugify(title) });

    if (photo) {
      notice.photo.data = fs.readFileSync(photo.path);
      notice.photo.contentType = photo.type;
    }

    await notice.save();
    res.status(200).send({
      success: true,
      message: "successfully add new notice",
      notice,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in trycatch ",
      error,
    });
  }
};

// get notice
export const getNoticeController = async (req, res) => {
  try {
    const notice = await noticeModel.find({}).select("-photo");
    if (notice.length > 0) {
      res.status(200).send({
        success: true,
        message: "successFully getting all notices",
        notice,
      });
    } else {
      res.status(400).send({
        success: true,
        message: "NO notice is added",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in trycatch block",
      error,
    });
  }
};

// delete notice
export const deleteNoticeController = async (req, res) => {
  try {
    const notice = await noticeModel.findByIdAndDelete(req.params.id).select("-photo");
    if (notice) {
      res.status(200).send({
        success: true,
        message: "successFUlly deleted notice",
        notice,
      });
    } else {
      res.status(300).send({
        success: false,
        message: "No item in notice ",
        notice,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in trycatch block",
      error,
    });
  }
};
// update notice
export const updateNoticeController = async (req, res) => {
  try {
    const { title, description, date, catagory } = req.fields;
    const { photo } = req.files;
    const id = req.params.id;

    const notice = await noticeModel.findById(id);
    if (!notice) {
      return res.status(400).send({
        success: false,
        message: "No notice finded",
      });
    }
    if (title) notice.title = title;
    if (description) notice.description = description;
    if (date) notice.date = date;
    if (catagory) notice.catagory = catagory;
    if (photo) {
      notice.photo.data = fs.readFileSync(photo.path);
      notice.photo.contentType = photo.type;
    }

    await notice.save();
    res.status(200).send({
      success: true,
      message: "successFUlly update notice",
      notice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in trycatch block",
      error,
    });
  }
};

// get photo
export const getPhotoController=async(req,res)=>{
  try {
    const id=req.params.id;
    const photo=await noticeModel.findById(id).select('photo');
    const img=photo?.photo
    if(photo?.photo){
      res.status(200).send({
        success:true,
        message:'successFully getting photo',
        photo
      })
    }else{
      res.status(400).send({
        success:true,
        message:' No photo uploaded',
      })
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'error in trycatch block',
      error
    })
    
  }
}