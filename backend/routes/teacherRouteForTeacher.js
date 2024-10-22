import express from 'express'
import { getStudentForTeacher } from '../controller/teacherForTeacher.js'

const router=express.Router()

router.get('/studentForTeacher/:id',getStudentForTeacher)


export default router