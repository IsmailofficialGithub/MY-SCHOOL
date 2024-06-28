import express from 'express'
import formidable from 'express-formidable'
import { addReportController, checkingAvilabilityController, deleteReportController, getAllReportsController, getSingleReportController } from '../controller/reportController.js'

const router=express.Router()

// create report
router.post('/addReport',formidable(),addReportController)
// get report
router.get('/getReport/:sId',getSingleReportController)
//get all reports
router.get('/getAllReports',getAllReportsController)
//delete reports
router.delete('/deleteReport/:sId',deleteReportController)
// is add already 
router.get('/checkingAvilability/:sId',checkingAvilabilityController)
export default router