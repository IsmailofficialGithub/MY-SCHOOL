import express from 'express'
import {addStudentController, classFilterController, deleteStudent, getAllStudentController, getSingleStudentController, getStudentImages, searchStudentController, updateStudent } from '../controller/studentController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import formidable from 'express-formidable';
const router=express.Router();

// add student 
router.post('/add-student',formidable(),addStudentController)
// get product images
router.get('/get-student-photo/:id',getStudentImages)
// get all student
router.get('/getAllStudent',getAllStudentController)
// get single student
router.get('/get-single-student/:id',getSingleStudentController)
// delete student 
router.delete('/deleteStudent/:id', deleteStudent)
// update student detail
router.post('/updateStudent/:id',formidable(),updateStudent)
// filter by class
router.post('/classFilter/:grade',classFilterController)
// search student
router.post('/searchStudent',searchStudentController)


export default router;