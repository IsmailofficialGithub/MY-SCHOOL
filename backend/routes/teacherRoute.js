import express from 'express'
import { addTeacherController, allTeacherController, deleteTeacherController, singleTeacherController, teacherIdCardController, teacherPhotoController, updateTeacherController } from '../controller/teacherController.js';
import formidable from 'express-formidable';

const router=express.Router();

// routes

// add teacher
router.post('/addTeacher',formidable(),addTeacherController)
// get all teacher
router.get('/allTeacher',allTeacherController)
// get photo 
router.get('/teacherPhoto/:id',teacherPhotoController)
// get idCard 
router.get('/teacherIdCard/:id',teacherIdCardController)
// get single teacher 
router.get('/singleTeacher/:id',singleTeacherController)
//delete teacher
router.delete('/deleteTeacher/:id',deleteTeacherController) 
//update teacher
router.put('/updateTeacher/:id',formidable(),updateTeacherController) 

export default router;