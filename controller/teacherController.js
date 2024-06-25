import teacherModel from "../models/teacherModel.js";
import slugify from "slugify";
import fs from "fs";

export const addTeacherController = async (req, res) => {
  try {
    const { name, gender, address, experience, bankDetail, subject, salary, phone } = req.fields;
    const { idCard, photo } = req.files;
    switch (true) {
      case !name:
        return res.status(300).send({ error: "Name is required" });
      case !gender:
        return res.status(300).send({ error: "gender is required" });
      case !address:
        return res.status(300).send({ error: "address is required" });
      case !experience:
        return res.status(300).send({ error: "experience is required" });
      case !bankDetail:
        return res.status(300).send({ error: "bankDetail is required" });
      case !subject:
        return res.status(300).send({ error: "subject is required" });
      case !phone:
        return res.status(300).send({ error: "phone is required" });
      case !salary:
        return res.status(300).send({ error: "salary is required" });
      case idCard && idCard.size > 1000000:
        return res.status(300).send({ error: "idCard is required and Less than 1MB" });
      case photo && photo.size > 1000000:
        return res.status(300).send({ error: "photo is required and Less than 1MB" });
    }
    const student = new teacherModel({ ...req.fields, slug: slugify(name) });
    if (idCard) {
      student.idCard.data = fs.readFileSync(idCard.path);
      student.idCard.contentType = idCard.type;
    }
    if (photo) {
      student.photo.data = fs.readFileSync(photo.path);
      student.photo.contentType = photo.type;
    }
    await student.save();
    res.status(200).send({
      success: true,
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in adding student",
      success: false,
      error,
    });
  }
};

// getting all teachers
export const allTeacherController = async (req, res) => {
  try {
    const teachers = await teacherModel.find({}).select("-photo").select("-idCard").sort({ createAt: -1 });
    res.status(200).send({
      success: true,
      message: "successFully getting all teacher",
      teachers,
    });
  } catch (error) {
    console.log(error);
  }
};

// getting teacher photo
export const teacherPhotoController = async (req, res) => {
  try {
    const student = await teacherModel.findById(req.params.id).select("photo");
    if(student?.photo.data){
      res.set('Content-type',student.photo.contentType);
      return res.status(200).send(student.photo.data);
    
    } else {
      res.status(404).send({
        success: false,
        message: "No user available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};
// getting teacher idCard
export const teacherIdCardController = async (req, res) => {
  try {
    const student = await teacherModel.findById(req.params.id).select("idCard");
    if(student?.idCard?.data){
      res.set('Content-type',student.idCard.contentType);
      return res.status(200).send(student.idCard.data);
    
    } else {
      res.status(404).send({
        success: false,
        message: "No user available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};


//singleTeacherController
export const singleTeacherController=async(req,res)=>{
  try {
    const data=await teacherModel.findById(req.params.id).select('-photo -idCard')
    if(data){
      res.status(200).send({
        success:true,
        message:'successFully getting Teacher Detail',
        data
      })
    }else{
      res.status(404).send({
        success:false,
        message:'No teacher Found',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'error in getting single teacher detail',
      error
    })
    
  }
}



//deleteTeacherController
export const deleteTeacherController=async(req,res)=>{
  try {
    const data=await teacherModel.findByIdAndDelete(req.params.id)
    res.status(200).send({
      success:true,
      message:'successFully deleted data',
      data
    })
  } catch (error) {
    console.log(error)
    
  }
}


// update teacher detail 
export const updateTeacherController = async (req, res) => {
  try {
    const { id } = req.params;
    const {name, gender, address, experience, bankDetail, subject, salary, phone } = req.fields;
    const { idCard, photo } = req.files;

    // Find the student by ID
    const teacher = await teacherModel.findById(id);
    if (!teacher) {
      return res.status(404).send({ error: "teacher not found" });
    }

    // Update fields if provided
    if (name) teacher.name = name;
    if (gender) teacher.gender = gender;
    if (address) teacher.address = address;
    if (salary) teacher.salary = salary;
    if (subject) teacher.subject = subject;
    if (bankDetail) teacher.bankDetail = bankDetail;
    if (phone) teacher.phone = phone;
    if (experience) teacher.experience = experience;
    if (name) teacher.slug = slugify(name); // Update slug if name changes

    // Handle photo if provided
    if (photo) {
      if (photo.size > 300000) {
        return res.status(300).send({ error: "Photo must be less than 3MB" });
      }
      teacher.photo.data = fs.readFileSync(photo.path);
      teacher.photo.contentType = photo.type;
    }
    if (idCard) {
      if (idCard.size > 300000) {
        return res.status(300).send({ error: "idCard must be less than 3MB" });
      }
      teacher.idCard.data = fs.readFileSync(idCard.path);
      teacher.idCard.contentType = idCard.type;
    }

    // Save the updated teacher
    await teacher.save()
    res.status(200).send({
      success: true,
      message: 'teacher updated successfully',
      teacher
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in updating teacher",
      success: false,
      error,
    });
  }
};