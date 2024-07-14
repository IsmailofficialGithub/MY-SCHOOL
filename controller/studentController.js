import mongoose from "mongoose";
import slugify from "slugify";
import studentModel from "../models/studentModel.js";
import fs from "fs";
import userModel from "../models/userModel.js";
import { hashedPassword } from "../helper/hashedPassword.js";

// add student
export const addStudentController = async (req, res) => {
  try {
    const { name, fatherName, address, rollNumber, grade, age, phone, fee, userId, password, answer } = req.fields;
    const { photo } = req.files;

    // Validate required fields
    switch (true) {
      case !name:
        return res.status(300).send({ error: "Name is required" });
      case !fatherName:
        return res.status(300).send({ error: "fatherName is required" });
      case !address:
        return res.status(300).send({ error: "address is required" });
      case !rollNumber:
        return res.status(300).send({ error: "rollNumber is required" });
      case !grade:
        return res.status(300).send({ error: "grade is required" });
      case !age:
        return res.status(300).send({ error: "age is required" });
      case !phone:
        return res.status(300).send({ error: "phone is required" });
      case !fee:
        return res.status(300).send({ error: "fee is required" });
      case !userId:
        return res.status(300).send({ error: "userId is required" });
      case !password:
        return res.status(300).send({ error: "password is required" });
      case photo && photo.size > 100000:
        return res.status(300).send({ error: "photo is required and Less than 1MB" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ userId });
    if (existingUser) {
      return res.status(200).send({
        message: "userId is Not available",
        success: false,
        existingUser,
      });
    }

    // Create student entry
    let student;
    try {
      student = new studentModel({ ...req.fields, slug: slugify(name) });
      if (photo) {
        student.photo.data = fs.readFileSync(photo.path);
        student.photo.contentType = photo.type;
      }
      await student.save();
    } catch (error) {
      return res.status(500).send({ error: "Failed to add student", details: error.message });
    }

    // Hash password and create user entry with reference to student
    try {
      const hash = await hashedPassword(password);
      const user = new userModel({ userId, password: hash, answer, role: 1, studentUserId: student._id });
      await user.save();
    } catch (error) {
      // Rollback student creation if user creation fails
      await studentModel.findByIdAndDelete(student._id);
      return res.status(500).send({ error: "Failed to add user", details: error.message });
    }

    res.status(200).send({
      success: true,
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", details: error.message });
  }
};

// gettting single student

export const getSingleStudentController = async (req, res) => {
  try {
    const user = await studentModel.findById(req.params.id).select("-photo");
    if (!user) {
      res.status(300).send({
        success: false,
        message: "No Student Found",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "getting student info successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting info of student",
      error,
    });
  }
};

//get all students

export const getAllStudentController = async (req, res) => {
  try {
    const students = await studentModel.find({}).select("-photo").sort("created_at");
    if (students) {
      res.status(200).send({
        success: true,
        message: "getting student detail successfully",
        students,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "error in gettting all student",
        error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(300).send({
      success: false,
      message: "error in gettting all student",
      error,
    });
  }
};

/// getting student images

export const getStudentImages = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id).select("photo");
    if (student?.photo.data) {
      res.set("Content-type", student.photo.contentType);
      return res.status(200).send(student.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting photo of student",
      error,
    });
  }
};

// deleteStudent

export const deleteStudent = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id).select("-photo");
    const userId = student?.userId;

    if (student) {
      const deleteUser = await userModel.findOneAndDelete({ userId: userId });
      const deleteStudent = await studentModel.findByIdAndDelete(req.params.id).select("-photo");
      res.status(200).send({
        success: true,
        message: "successfully deleted student",
        student,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "no user Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in deleting student ",
      error,
    });
  }
};

// update student

// export const updateStudent=async(req,res)=>{
//   try {
//     const { name,fatherName,age,phone,grade,rollNumber,fee,address} = req.fields;
//     const { photo } = req.files;
//     const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "data is updated successfully",
//       products,
//     });

//   }

//    catch (error) {
//     console.log(error)
//   }
// }

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, fatherName, address, rollNumber, grade, age, phone, fee } = req.fields;
    const { photo } = req.files;

    // Find the student by ID
    const student = await studentModel.findById(id);
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }

    // Update fields if provided
    if (name) student.name = name;
    if (fatherName) student.fatherName = fatherName;
    if (address) student.address = address;
    if (rollNumber) student.rollNumber = rollNumber;
    if (grade) student.grade = grade;
    if (age) student.age = age;
    if (phone) student.phone = phone;
    if (fee) student.fee = fee;
    if (name) student.slug = slugify(name); // Update slug if name changes

    // Handle photo if provided
    if (photo) {
      if (photo.size > 100000) {
        return res.status(300).send({ error: "Photo must be less than 1MB" });
      }
      student.photo.data = fs.readFileSync(photo.path);
      student.photo.contentType = photo.type;
    }

    // Save the updated student
    await student.save();
    res.status(200).send({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in updating student",
      success: false,
      error,
    });
  }
};

// // filter student by class
// export const classFilterController=async(req,res)=>{
//   try {
//     const query=req.body;

//     const student=await studentModel.find({query}).select('-photo -idCard')
//    if(student.length>0){
//     res.status(200).send({
//       success:true,
//       message:`Successfully getting data by filter class:${query}`,
//       student
//     })
//    }else{
//     res.status(200).send({
//       success:false,
//       message:`No student in class:${query}`,
//       student
//     })
//    }

//   } catch (error) {
//     console.log(error)
//     res.status(500).send({
//       success:false,
//       message:'error in backend filter student',
//       error
//     })

//   }
// }
export const classFilterController = async (req, res) => {
  try {
    const { grade } = req.params;
    console.log("grade is ==" + grade);
    if (!grade || grade == "") {
      return res.status(400).send({
        success: false,
        message: "Grade is required",
      });
    }

    const students = await studentModel.find({ grade: grade }).select("-photo -idCard");

    if (students.length > 0) {
      res.status(200).send({
        success: true,
        message: `Successfully retrieved data for class: ${grade}`,
        students,
      });
    } else {
      res.status(200).send({
        success: false,
        message: `No students found in class: ${grade}`,
        students,
      });
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send({
      success: false,
      message: "Error in backend filter student",
      error: error.message,
    });
  }
};

// search student

export const searchStudentController = async (req, res) => {
  try {
    const { address, name, fatherName, grade } = req.body;

    // Build query object dynamically
    const query = {};
    if (address) {
      query.address = new RegExp(address, "i");
    }
    if (name) {
      query.name = new RegExp(name, "i");
    }
    if (fatherName) {
      query.fatherName = new RegExp(fatherName, "i");
    }
    if (grade) {
      query.grade = new RegExp(grade, "i");
    }
    console.log(query);
    // Ensure at least one field is provided for the search
    if (Object.keys(query).length === 0) {
      return res.status(200).send({
        success: true,
        message: "At least one search criterion (address, fatherName, class) is required",
      });
    }

    const data = await studentModel.find(query).select("-photo -idCard");

    if (data.length === 0) {
      return res.status(200).send({
        success: false,
        message: " No students found ",
        data,
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully search according to critaria",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred while searching for students",
      error,
    });
  }
};
